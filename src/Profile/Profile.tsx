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

export default function Profile({user}: {user: User}) {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [showPostInput, setShowPostInput] = useState<boolean>(false);
    const pic = require("../static/images/profile_pictures/" + user.picture + ".jpg");

    function submitPost({title, message}: PostType): void {
        setPosts(posts => [...posts, {title, message, post_id: posts.length}]);
        setShowPostInput(false);
    }

    return (
        <>
            <Grid container spacing={2} sx={{m: 2}}>
                <Grid>
                    <img src={pic} alt="Profile" width="100px" height="100px" />
                </Grid>
                <Grid>
                    <h1>{user.name}</h1>
                    <h5>{user.description}</h5>
                </Grid>
            </Grid>
            <div style={{margin: 10}}>
                <Fab aria-label="add" color="primary" style={{margin: 10}} onClick={() => setShowPostInput(!showPostInput)}>
                    {showPostInput ? <RemoveIcon /> : <AddIcon />}
                </Fab>
                {showPostInput && <><PostInput submitPost={submitPost}/><br/></>}
            </div>
            <PostTimeline posts={posts} />
        </>
    );
}