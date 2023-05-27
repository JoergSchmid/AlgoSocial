import React from 'react';
import { AlgorithmType, PostType } from "../Profile";
import Post from "./Post";
import Grid from "@mui/material/Unstable_Grid2";
import AlgorithmPost from './AlgorithmPost';


export default function PostTimeline({ availableAlgorithms, posts, deletePost }: {
    availableAlgorithms: AlgorithmType[],
    posts: PostType[],
    deletePost: (id: number) => void
}) {
    return <Grid container spacing={4}> {
        posts.map(post => {
            return (
                <Grid key={post.title}>
                    {post.task ?
                        <AlgorithmPost availableAlgorithms={availableAlgorithms} post={post} deletePost={deletePost} /> :
                        <Post post={post} deletePost={deletePost} />}
                </Grid>
            );
        })
    }</Grid>
}