import { useState } from "react";
import PostInput from "./Post/PostInput";
import PostTimeline from "./Post/PostTimeline";
import { User } from "../App";
import Grid from "@mui/material/Unstable_Grid2";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export type PostType = {
    title: string,
    message: string,
    post_id?: number
}

export default function Profile({ user, avatar, changeAvatar }: { user: User, avatar: string, changeAvatar: (id?: number) => void }) {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [showPostInput, setShowPostInput] = useState<boolean>(false);

    function submitPost({ title, message }: PostType): void {
        setPosts(posts => [...posts, { title, message, post_id: posts.length }]);
        setShowPostInput(false);
    }

    return (
        <>
            <Grid container spacing={2} sx={{ m: 2 }}>
                <Grid>
                    <img src={avatar} alt="Profile" width="100px" height="100px" onClick={() => changeAvatar()} />
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
            </Grid>
            <PostTimeline posts={posts} />
        </>
    );
}