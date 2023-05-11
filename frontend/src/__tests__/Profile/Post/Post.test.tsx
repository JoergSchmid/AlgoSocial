import React from 'react';
import { render, screen } from '@testing-library/react';
import Post from '../../../Profile/Post/Post';
import { test_post, test_user } from '../../App.test';

describe('Post component', () => {
    test('can generate a complete post', () => {
        render(
            <Post post={{ title: test_post.title, message: test_post.message, id: test_user.userId }} deletePost={(id: number) => { }}></Post>
        );

        expect(screen.getByText(RegExp(test_post.title))).toBeInTheDocument();
        expect(screen.getByText(RegExp(test_post.message))).toBeInTheDocument();
    });
})