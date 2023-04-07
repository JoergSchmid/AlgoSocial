import { postType } from "../Profile";

export default function Post(props: {post: postType}) {
    return (
        <>
            <h2>{props.post.title}</h2>
            <h4>{props.post.message}</h4>
        </>
    );
}