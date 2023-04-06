import { postType } from "../Profile";
import Post from "./Post";

export default function PostTimeline(props: {posts: postType[]}) {
    return <> {
        props.posts.map(post => {
            return <Post post={post}/>;
        })
    }</>
}