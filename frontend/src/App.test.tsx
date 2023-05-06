import React from 'react';
import { render, screen } from '@testing-library/react';
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

const test_post: PostType = {
  id: -1,
  title: "A test post",
  message: "This is a test post for testing purposes."
}

test('finds the first example user "Joerg"', () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>);
  const exampleUser = screen.getByText(/Joerg/);
  expect(exampleUser).toBeInTheDocument();
});

test('can create a new post', () => {
  render(
    <Post post={{ title: test_post.title, message: test_post.message, id: -5 }} deletePost={(id: number) => { }}></Post>
  );

  expect(screen.getByText(RegExp(test_post.title))).toBeInTheDocument();
  expect(screen.getByText(RegExp(test_post.message))).toBeInTheDocument();
});
