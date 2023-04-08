import { Paper, Typography, styled } from "@mui/material";
import { PostType } from "../Profile";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#eee',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Post({post}: {post: PostType}) {
    return (
        <Item>
            <Typography variant="h4">{post.title}</Typography>
            <Typography variant="body1">{post.message}</Typography>
        </Item>
    );
}