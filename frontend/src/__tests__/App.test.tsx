import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { PostType } from '../Profile/Profile';
import { User } from "../App";

export const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

export const test_user: User = {
  userId: -1,
  name: "test_user",
  description: "A user designed for testing",
  pictureIndex: 0
}

export const avatar = require("../static/images/profile_pictures/" + test_user.pictureIndex + ".jpg");

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
      </ApolloProvider>);
    const exampleUser = screen.getByText(/Joerg/);
    expect(exampleUser).toBeInTheDocument();
  });
})