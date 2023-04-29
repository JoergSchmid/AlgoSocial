import React, { useState } from 'react';
import { Button, Paper, Typography, styled } from "@mui/material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { PostType } from "../Profile";
import { useMutation } from '@apollo/client';
import { REMOVE_POST } from './gqlRequests';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#eee',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '100px',
    maxWidth: '400px',
    borderRadius: "16px",
    position: "relative"
}));

export default function Post({ post }: { post: PostType }) {
    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);
    const [useDeletePost, { error: postDeletionError }] = useMutation(REMOVE_POST);

    function deletePost(): void {
        useDeletePost({
            variables: { id: post.id }
        });
    }

    // Error log
    if (postDeletionError) { console.log(postDeletionError) }

    return (
        <Item onMouseEnter={() => setShowDeleteButton(true)} onMouseLeave={() => setShowDeleteButton(false)} >
            <Typography variant="h4" style={{ wordWrap: "break-word" }}>{post.title}</Typography>
            <Typography variant="body1" style={{ wordWrap: "break-word", marginBottom: "20px" }}>{post.message}</Typography>
            {showDeleteButton && <Button
                variant='text'
                style={{
                    color: "darkred",
                    position: "absolute",
                    right: "5px",
                    bottom: "5px",
                    width: "fit-content"
                }}
                onClick={deletePost}
            >
                <DeleteSweepIcon />
            </Button>}
            {postDeletionError && <p className='error'>Error occured when trying to delete post: {postDeletionError.name}</p>}
        </Item>
    );
}