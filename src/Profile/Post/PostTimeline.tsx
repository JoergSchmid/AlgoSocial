import Post from "./Post";

type postsProp = {
    posts: string[];
}

export default function PostTimeline(props: postsProp) {
    return <>{props.posts.map((post: string) => {
        return (<Post message={post} />);
    })}</>
}