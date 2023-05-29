import React from 'react';
import { Typography } from "@mui/material";
import { PostType } from "../Profile";
import PostCard from './PostCard';

export default function Post({ post, deletePost }: { post: PostType, deletePost: (id: number) => void }) {
    return (
        <PostCard post={post} deletePost={deletePost}>

            <Typography variant="h4" style={{ wordWrap: "break-word" }}>{post.title}</Typography>
            <Typography
                variant="body1"
                style={{ wordWrap: "break-word", marginBottom: "20px" }}>{post.message}</Typography>

        </PostCard>
    );
}