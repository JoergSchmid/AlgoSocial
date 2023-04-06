import Post from "./Post";

interface postsProp {
    posts: string[];
}

export default function PostTimeline(props: postsProp) {
    return <>{props.posts.map((post: string) => {
        return (<Post message={post} />);
    })}</>
}