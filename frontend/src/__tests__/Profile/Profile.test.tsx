import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import Profile from '../../Profile/Profile';
import { avatar, client, test_post, testUsers } from '../App.test';

describe('Profile component', () => {
    test('can add a Post with PostInput', () => {
        // Mock the showDeleteButton hook
        const realUseState: any = React.useState;
        const stubInitialState = [true];
        jest.spyOn(React, "useState").mockImplementation(() => realUseState(stubInitialState))

        render(
            <ApolloProvider client={client}>
                <Profile user={testUsers[0]} avatar={avatar} changeUser={() => { }} />
            </ApolloProvider>
        );

        // PostInput should start closed
        const addIcon = screen.getByTestId('addIcon');
        expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
        expect(screen.queryByTestId('removeIcon')).not.toBeInTheDocument();
        expect(addIcon).toBeInTheDocument();

        // Click the addIcon <Fab>
        act(() => {
            screen.getByTestId("btn_TogglePostInput").click();
        });

        // Check, if the Icon switched
        const removeIcon = screen.getByTestId('removeIcon');
        expect(removeIcon).toBeInTheDocument();
        expect(addIcon).not.toBeInTheDocument();

        // Check, if TextFields and Button are present
        const titleInput = screen.getByLabelText("Title");
        const messageInput = screen.getByLabelText("Message");
        const buttonSubmit = screen.getByTestId("btn_submit");
        expect(titleInput).toBeInTheDocument();
        expect(messageInput).toBeInTheDocument();
        expect(buttonSubmit).toBeInTheDocument();

        // Check, if TextFields are empty
        expect(titleInput).toHaveValue("");
        expect(messageInput).toHaveValue("");

        // Submit new post
        fireEvent.change(titleInput, { target: { value: test_post.title } });
        fireEvent.change(messageInput, { target: { value: test_post.message } });
        expect(titleInput).toHaveValue(test_post.title);
        expect(messageInput).toHaveValue(test_post.message);
        act(() => {
            screen.getByTestId("btn_submit").click();
        });

        // Check, if PostInput is closed again
        expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
        expect(removeIcon).not.toBeInTheDocument();
        expect(screen.getByTestId('addIcon')).toBeInTheDocument();

        // Check for test_post on the page
        expect(screen.getByTestId("postContainer")).toBeInTheDocument();
        expect(screen.getByText(RegExp(test_post.title))).toBeInTheDocument();
        expect(screen.getByText(RegExp(test_post.message))).toBeInTheDocument();

        // MouseOver postContainer event, which sets "showDeleteButton" hook to true,
        // mocked by setting useState above, since only real, fetched posts can be deleted.
        const deleteButton = screen.getByTestId("btn_delete");
        expect(deleteButton).toBeInTheDocument();
        act(() => {
            deleteButton.click();
            // note: post will not be removed without server connection
        });

        // Check, if delete button disappears
        fireEvent.mouseLeave(screen.getByTestId("postContainer"));
        expect(deleteButton).not.toBeInTheDocument();

        // Check for loading button indicating a delete request to the server has been sent
        expect(screen.getByTestId("loadIcon")).toBeInTheDocument();
    });
})