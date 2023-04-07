import { Typography } from "@mui/material";
import { postType } from "../Profile";

export default function Post(props: {post: postType}) {
    return (
        <>
            <Typography variant="h4">{props.post.title}</Typography>
            <Typography variant="body1">{props.post.message}</Typography>
        </>
    );
}