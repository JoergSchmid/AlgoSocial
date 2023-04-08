import { PostType } from "../Profile";
import Post from "./Post";
import Grid from "@mui/material/Unstable_Grid2";


export default function PostTimeline({posts}: {posts: PostType[]}) {
    return <Grid container spacing={4}> {
        posts.map(post => {
            return (
                <Grid key={post.title}>
                    <Post post={post}/>
                </Grid>
            );
        })
    }</Grid>
}