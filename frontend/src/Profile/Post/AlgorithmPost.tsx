import React from 'react';
import { Typography } from "@mui/material";
import { AlgorithmType, PostType, Status } from "../Profile";
import PostCard from './PostCard';

export default function AlgorithmPost({ availableAlgorithms, post, deletePost }: {
    availableAlgorithms: AlgorithmType[],
    post: PostType,
    deletePost: (id: number) => void,
}) {

    const getAlgorithmDisplayName = (name: string): string => {
        const algorithm = availableAlgorithms.find(alg => alg.name === name);
        return algorithm ? algorithm.displayName : name;
    }

    const removeBrackets = (text: string): string => {
        if (text === null) { return text; }
        return text.replace(/[[\]]/g, "");
    }

    const getStatusBackgroundColor = (): string => {
        if (!post.task) { return ""; }
        const postStatus = post.task.status;

        const STATUS_COLOR_MAPPING = {
            [Status.ERROR]: "rgba(255,0,0,0.7)",
            [Status.CALCULATING]: "rgba(255,255,0,0.5)",
            [Status.DONE]: "rgba(0,255,0,0.2)"
        }

        return STATUS_COLOR_MAPPING[postStatus];
    }

    return (
        <>
            {post.task && <PostCard post={post} deletePost={deletePost} backgroundColor={getStatusBackgroundColor()}>
                <Typography variant="h4" style={{ wordWrap: "break-word" }}>{post.title}</Typography>
                <Typography
                    variant="h6"
                    style={{ wordWrap: "break-word" }}
                >{getAlgorithmDisplayName(post.task.algorithm)}</Typography>
                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word" }}
                >{removeBrackets(post.message)}</Typography>
                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word", marginBottom: "20px" }}
                >{removeBrackets(post.task.result)}</Typography>
            </PostCard>}
        </>
    );
}