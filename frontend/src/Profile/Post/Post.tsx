import React from 'react';
import { Paper, Typography, styled } from "@mui/material";
import { PostType } from "../Profile";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#eee',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '100px',
    maxWidth: '400px'
}));

export default function Post({ post }: { post: PostType }) {
    return (
        <Item>
            <Typography variant="h4" style={{ wordWrap: "break-word" }}>{post.title}</Typography>
            <Typography variant="body1" style={{ wordWrap: "break-word" }}>{post.message}</Typography>
        </Item>
    );
}