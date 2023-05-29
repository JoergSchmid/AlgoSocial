import React, { ReactNode, useState } from 'react';
import { Button, Paper, styled } from "@mui/material";
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

export default function PostCard({ post, deletePost, backgroundColor = "#eee", children }: {
    post: PostType,
    deletePost: (id: number) => void,
    backgroundColor?: string,
    children: ReactNode
}) {
    const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

    return (
        <>
            <Item
                style={{ backgroundColor }}
                data-testid="postContainer"
                onMouseEnter={() => { if (post.id > 0) setShowDeleteButton(true) }}
                onMouseLeave={() => setShowDeleteButton(false)}
            >
                {children}

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

            </Item>
        </>
    );
}