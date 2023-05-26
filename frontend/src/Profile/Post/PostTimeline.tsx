import React from 'react';
import { PostType } from "../Profile";
import Post from "./Post";
import Grid from "@mui/material/Unstable_Grid2";
import AlgorithmPost from './AlgorithmPost';


export default function PostTimeline({ posts, deletePost }: { posts: PostType[], deletePost: (id: number) => void }) {
    return <Grid container spacing={4}> {
        posts.map(post => {
            return (
                <Grid key={post.title}>
                    {post.taskId && post.taskId > 0 ?
                        <AlgorithmPost post={post} deletePost={deletePost} /> :
                        <Post post={post} deletePost={deletePost} />}
                </Grid>
            );
        })
    }</Grid>
}