import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Post from './Profile/Post/Post';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

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
    <Post post={{ title: "test_title", message: "test_message", id: -5 }} deletePost={(id: number) => { }}></Post>
  );

  expect(screen.getByText(/test_title/)).toBeInTheDocument();
  expect(screen.getByText(/test_message/)).toBeInTheDocument();
});
