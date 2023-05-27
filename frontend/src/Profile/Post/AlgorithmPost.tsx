import React, { useState } from 'react';
import { Button, Paper, Typography, styled } from "@mui/material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { AlgorithmType, PostType, Status } from "../Profile";

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

export default function AlgorithmPost({ availableAlgorithms, post, deletePost }: {
    availableAlgorithms: AlgorithmType[],
    post: PostType,
    deletePost: (id: number) => void,
}) {
    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

    const getAlgorithmDisplayName = (name: string): string => {
        const algorithm = availableAlgorithms.find(alg => alg.name === name);
        return algorithm ? algorithm.displayName : name;
    }

    const removeBrackets = (text: string): string => {
        return text.replace(/[[\]]/g, "");
    }

    const getStatusBackgroundColor = (): string => {
        return post.task?.status ===
            Status.ERROR ? "rgba(255,0,0,0.7)" : post.task?.status ===
                Status.CALCULATING ? "rgba(255,255,0,0.5)" :
            "rgba(0,255,0,0.2)"
    }

    return (
        <>
            {post.task && <Item
                style={{ backgroundColor: getStatusBackgroundColor() }}
                data-testid="postContainer"
                onMouseEnter={() => { if (post.id > 0) setShowDeleteButton(true) }}
                onMouseLeave={() => setShowDeleteButton(false)}
            >
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
                {showDeleteButton && <Button
                    variant='text'
                    data-testid="btn_delete"
                    style={{
                        color: "darkred",
                        position: "absolute",
                        right: "5px",
                        bottom: "5px",
                        width: "fit-content"
                    }}
                    onClick={() => deletePost(post.id)}
                >
                    <DeleteSweepIcon />
                </Button>}
            </Item>}
        </>
    );
}