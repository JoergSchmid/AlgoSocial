import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import Profile from '../../Profile/Profile';
import { avatar, client, test_post, testUsers } from '../App.test';

describe('Profile component', () => {
    test('can open and close PostInput', () => {
        render(
            <ApolloProvider client={client}>
                <Profile user={testUsers[0]} avatar={avatar} changeUser={() => { }} />
            </ApolloProvider>
        );

        const togglePostInput = screen.getByTestId("btn_TogglePostInput");
        const addIcon = screen.getByTestId('addIcon');

        expect(screen.queryByLabelText("title")).not.toBeInTheDocument();
        expect(screen.queryByTestId('removeIcon')).not.toBeInTheDocument();
        expect(addIcon).toBeInTheDocument();

        act(() => {
            togglePostInput.click();
        });

        const removeIcon = screen.getByTestId('removeIcon');

        expect(removeIcon).toBeInTheDocument();
        expect(addIcon).not.toBeInTheDocument();
        expect(screen.getByLabelText("Title")).toBeInTheDocument();

        act(() => {
            togglePostInput.click();
        });

        expect(screen.queryByLabelText("title")).not.toBeInTheDocument();
        expect(screen.queryByTestId('removeIcon')).not.toBeInTheDocument();
        expect(screen.getByTestId('addIcon')).toBeInTheDocument();
    })

    test('can add a Post', () => {
        render(
            <ApolloProvider client={client}>
                <Profile user={testUsers[0]} avatar={avatar} changeUser={() => { }} />
            </ApolloProvider>
        );

        // Open PostInput
        act(() => {
            screen.getByTestId("btn_TogglePostInput").click();
        });

        // Check, if TextFields and Button are present
        const titleInput = screen.getByLabelText("Title");
        const messageInput = screen.getByLabelText("Enter message");
        const buttonSubmit = screen.getByTestId("btn_submit");
        expect(titleInput).toBeInTheDocument();
        expect(messageInput).toBeInTheDocument();
        expect(buttonSubmit).toBeInTheDocument();

        // Submit new post
        fireEvent.change(titleInput, { target: { value: test_post.title } });
        fireEvent.change(messageInput, { target: { value: test_post.message } });

        act(() => {
            buttonSubmit.click();
        });

        // Check, if PostInput is closed again
        expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
        expect(screen.getByTestId('addIcon')).toBeInTheDocument();

        // Check for test_post on the page
        expect(screen.getByTestId("postContainer")).toBeInTheDocument();
        expect(screen.getByText(RegExp(test_post.title))).toBeInTheDocument();
        expect(screen.getByText(RegExp(test_post.message))).toBeInTheDocument();
    });
})