import { Typography } from "@mui/material";
import { PostType } from "../Profile";

export default function Post({post}: {post: PostType}) {
    return (
        <>
            <Typography variant="h4">{post.title}</Typography>
            <Typography variant="body1">{post.message}</Typography>
        </>
    );
}