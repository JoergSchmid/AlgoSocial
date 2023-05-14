import { fireEvent, render, screen } from '@testing-library/react';
import Post from '../../../Profile/Post/Post';
import { test_post } from '../../App.test';

describe('Post component', () => {
    test('can generate a complete post', () => {
        render(
            <Post post={test_post} deletePost={(id: number) => { }}></Post>
        );

        expect(screen.getByText(RegExp(test_post.title))).toBeInTheDocument();
        expect(screen.getByText(RegExp(test_post.message))).toBeInTheDocument();
    });

    test('delete button toggles on mouse events', () => {
        render(
            <Post post={test_post} deletePost={(id: number) => { }}></Post>
        );

        const postContainer = screen.getByTestId("postContainer");

        expect(postContainer).toBeInTheDocument();
        expect(screen.queryByTestId("btn_delete")).not.toBeInTheDocument();

        fireEvent.mouseEnter(postContainer);

        const deleteButton = screen.getByTestId("btn_delete");
        expect(deleteButton).toBeInTheDocument();

        fireEvent.mouseLeave(postContainer);

        expect(deleteButton).not.toBeInTheDocument();
    });
})