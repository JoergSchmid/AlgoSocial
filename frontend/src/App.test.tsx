import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Post from './Profile/Post/Post';
import Profile, { PostType } from './Profile/Profile';
import { User } from "./App";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const test_user: User = {
  userId: -1,
  name: "test_user",
  description: "A user designed for testing",
  pictureIndex: 0
}

const avatar = require("./static/images/profile_pictures/" + test_user.pictureIndex + ".jpg");

const test_post: PostType = {
  id: 1,
  title: "A test post",
  message: "This is a test post for testing purposes."
}

describe('App component', () => {
  test('finds the first example user "Joerg"', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>);
    const exampleUser = screen.getByText(/Joerg/);
    expect(exampleUser).toBeInTheDocument();
  });
})

describe('Post component', () => {
  test('can generate a complete post', () => {
    render(
      <Post post={{ title: test_post.title, message: test_post.message, id: test_user.userId }} deletePost={(id: number) => { }}></Post>
    );

    expect(screen.getByText(RegExp(test_post.title))).toBeInTheDocument();
    expect(screen.getByText(RegExp(test_post.message))).toBeInTheDocument();
  });
})

describe('Profile component', () => {
  test('can add a Post with PostInput', () => {
    render(<ApolloProvider client={client}>
      <Profile user={test_user} avatar={avatar} changeUser={() => { }} />
    </ApolloProvider>);

    // PostInput should start closed
    expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('removeIcon')).not.toBeInTheDocument();
    expect(screen.getByTestId('addIcon')).toBeInTheDocument();

    // Click the addIcon <Fab>
    act(() => {
      screen.getByTestId("btn_TogglePostInput").click();
    });

    // Check, if the Icon switched
    expect(screen.getByTestId('removeIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('addIcon')).not.toBeInTheDocument();

    // Check, if TextFields and Button are present
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByTestId("btn_submit")).toBeInTheDocument();

    // Check, if TextFields are empty
    expect(screen.getByLabelText("Title")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");

    // Submit new post
    const titleInput = screen.getByLabelText("Title");
    const messageInput = screen.getByLabelText("Message");
    fireEvent.change(titleInput, { target: { value: test_post.title } });
    fireEvent.change(messageInput, { target: { value: test_post.message } });
    expect(titleInput).toHaveValue(test_post.title);
    expect(messageInput).toHaveValue(test_post.message);
    act(() => {
      screen.getByTestId("btn_submit").click();
    });

    // Check, if PostInput is closed again
    expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('removeIcon')).not.toBeInTheDocument();
    expect(screen.getByTestId('addIcon')).toBeInTheDocument();

    // Check for test_post on the page
    expect(screen.getByText(RegExp(test_post.title))).toBeInTheDocument();
    expect(screen.getByText(RegExp(test_post.message))).toBeInTheDocument();
  });
})

