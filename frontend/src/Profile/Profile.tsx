import React, { useEffect, useState } from 'react';
import PostInput from "./Post/PostInput";
import PostTimeline from "./Post/PostTimeline";
import { User } from "../App";
import Grid from "@mui/material/Unstable_Grid2";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ADD_POST, GET_ALL_POSTS_BY_USER_ID } from "./Post/gqlRequests";
import { useMutation, useQuery } from "@apollo/client";

export type PostType = {
    title: string,
    message: string,
    post_id?: number
}

export default function Profile({ user, avatar, changeUser }: { user: User, avatar: string, changeUser: (id?: number) => void }) {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [showPostInput, setShowPostInput] = useState<boolean>(false);
    const [useAddPost, { error: mutationError }] = useMutation(ADD_POST);
    const { data: fetchedData, error: fetchedError } = useQuery(GET_ALL_POSTS_BY_USER_ID, {
        variables: { id: user.userId },
        fetchPolicy: 'no-cache',
        pollInterval: 10000
    });

    useEffect(() => {
        if (fetchedData) { setPosts(fetchedData.postsByUserId) }
    }, [fetchedData])

    function submitPost({ title, message }: PostType): void {
        setPosts(posts => [...posts, { title, message, post_id: posts.length }]);
        setShowPostInput(false);
        useAddPost({
            variables: { userId: user.userId, title, message }
        });
    }

    //Logging errors
    if (fetchedError) { console.log(fetchedError); }
    if (mutationError) { console.log(mutationError); }

    return (
        <>
            <Grid container spacing={2} sx={{ m: 2 }}>
                <Grid>
                    <img src={avatar} alt="Profile" width="100px" height="100px" onClick={() => changeUser()} />
                </Grid>
                <Grid>
                    <h1>{user.name}</h1>
                    <h5>{user.description}</h5>
                </Grid>
                <Grid>
                    <div style={{ margin: 10 }}>
                        <Fab aria-label="add" color="primary" style={{ margin: 10 }} onClick={() => setShowPostInput(!showPostInput)}>
                            {showPostInput ? <RemoveIcon /> : <AddIcon />}
                        </Fab>
                    </div>
                </Grid>
                <Grid>
                    {showPostInput && <><PostInput submitPost={submitPost} /><br /></>}
                </Grid>
                <Grid>
                    {fetchedError && <><p className='error'>Error Fetisching posts: {fetchedError.name}</p><br /></>}
                    {mutationError && <><p className='error'>Error sending post to server: {mutationError.name}</p><br /></>}
                </Grid>
            </Grid>
            <PostTimeline posts={posts} />
        </>
    );
}