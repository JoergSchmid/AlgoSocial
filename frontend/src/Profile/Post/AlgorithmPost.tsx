import React, { useState } from 'react';
import { Button, Paper, Typography, styled } from "@mui/material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { PostType } from "../Profile";

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

export default function AlgorithmPost({ post, deletePost }: {
    post: PostType,
    deletePost: (id: number) => void,
}) {
    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

    return (
        <>
            {post.task && <Item
                style={{
                    backgroundColor: post.task.status ===
                        "error" ? "rgba(255,0,0,0.7)" : post.task.status ===
                            "calculating" ? "rgba(255,255,0,0.5)" :
                        "rgba(0,255,0,0.2)"
                }}
                data-testid="postContainer"
                onMouseEnter={() => { if (post.id > 0) setShowDeleteButton(true) }}
                onMouseLeave={() => setShowDeleteButton(false)}
            >
                <Typography variant="h4" style={{ wordWrap: "break-word" }}>{post.title}</Typography>
                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word" }}
                >{post.task.input}</Typography>
                <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word", marginBottom: "20px" }}
                >{post.task.result}</Typography>
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