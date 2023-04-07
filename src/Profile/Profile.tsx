import { useState } from "react";
import PostInput from "./Post/PostInput";
import PostTimeline from "./Post/PostTimeline"
import pic from "../static/images/Joerg.jpg"
import { User } from "../App";
import Grid from "@mui/material/Unstable_Grid2";

export type PostType = {
    title: string,
    message: string,
    post_id?: number
}

export default function Profile({user}: {user: User}) {
    const [posts, setPosts] = useState<PostType[]>([]);

    function submitPost({title, message}: PostType): void {
        setPosts(posts => [...posts, {title, message, post_id: posts.length}]);
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
            <PostInput submitPost={submitPost}/>
            <PostTimeline posts={posts} />
        </>
    );
}