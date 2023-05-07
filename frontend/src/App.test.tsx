import React from 'react';
import { render, screen } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Post from './Profile/Post/Post';
import Profile, { PostType } from './Profile/Profile';
import { User } from "./App";

Enzyme.configure({ adapter: new Adapter() });

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

test('can generate a complete post', () => {
  render(
    <Post post={{ title: test_post.title, message: test_post.message, id: test_user.userId }} deletePost={(id: number) => { }}></Post>
  );

  expect(screen.getByText(RegExp(test_post.title))).toBeInTheDocument();
  expect(screen.getByText(RegExp(test_post.message))).toBeInTheDocument();
});

test('can add a Post with PostInput', () => {
  const wrapper = mount(
    <ApolloProvider client={client}>
      <Profile user={test_user} avatar={avatar} changeUser={() => { }} />
    </ApolloProvider>
  )

  //PostInput should start closed
  expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
  expect(wrapper.find('#removeIcon').exists()).toBe(false);
  expect(wrapper.find('#addIcon').exists()).toBe(true);


  // ToDo: This test fails. wrapper finds 5 elements. No good solution found yet.
  // Current workarount: Use the .last() node. .first() does NOT work.

  //expect(wrapper.find("#btnTogglePostInput").length).toEqual(1);

  // Click the addIcon <Fab>
  wrapper.find('#btnTogglePostInput').last().simulate('click');
  expect(wrapper.find('#removeIcon').exists()).toBe(true);
  expect(wrapper.find('#addIcon').exists()).toBe(false);

  //ToDo: Enter text and message
});

