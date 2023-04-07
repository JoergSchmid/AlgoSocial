import { Typography } from "@mui/material";
import { postType } from "../Profile";

export default function Post({post}: {post: postType}) {
    return (
        <>
            <Typography variant="h4">{post.title}</Typography>
            <Typography variant="body1">{post.message}</Typography>
        </>
    );
}