import { styled } from "@mui/material/styles";
import { PostType } from "../Profile";
import Post from "./Post";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#eee',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function PostTimeline({posts}: {posts: PostType[]}) {
    return <Grid container spacing={4}> {
        posts.map(post => {
            return (
                <Grid key={post.title}>
                    <Item><Post post={post}/></Item>
                </Grid>
            );
        })
    }</Grid>
}