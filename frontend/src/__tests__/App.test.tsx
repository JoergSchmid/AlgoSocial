import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from '../App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { PostType } from '../Profile/Profile';
import { User } from "../App";

export const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

export const testUsers: User[] = [
  {
    userId: 0,
    name: "test_user",
    description: "A user designed for testing",
    pictureIndex: 0
  }, {
    userId: 1,
    name: "Second user for testing",
    description: "This is a description!",
    pictureIndex: 0
  }
]

export const avatar = require("../static/images/profile_pictures/" + testUsers[0].pictureIndex + ".jpg");

export const test_post: PostType = {
  id: 1,
  title: "A test post",
  message: "This is a test post for testing purposes."
}

describe('App component', () => {
  test('finds the first example user "Joerg"', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const exampleUser = screen.getByText(/Joerg/);
    expect(exampleUser).toBeInTheDocument();
  });

  test('can switch between users by clicking profile picture', () => {
    render(
      <ApolloProvider client={client}>
        <App userList={testUsers} />
      </ApolloProvider>
    );

    const profilePicture = screen.getByTestId("profilePicture");
    const queryTestUser = (id: number) => { return screen.queryByText(RegExp(testUsers[id].description)) }
    const getTestUser = (id: number) => { return screen.getByText(RegExp(testUsers[id].description)) }

    expect(profilePicture).toBeInTheDocument();
    expect(getTestUser(0)).toBeInTheDocument();

    act(() => {
      profilePicture.click();
    })

    expect(queryTestUser(0)).not.toBeInTheDocument();
    expect(getTestUser(1)).toBeInTheDocument();
  })

  test('can toggle dark mode', () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );

    const btn_toggleTheme = screen.getByTestId("btn_toggleTheme");

    expect(btn_toggleTheme).toBeInTheDocument();
    expect(document.body).toHaveClass("light");

    act(() => {
      btn_toggleTheme.click();
    })

    expect(document.body).toHaveClass("dark");

    act(() => {
      btn_toggleTheme.click();
    })

    expect(document.body).toHaveClass("light");
  })
})