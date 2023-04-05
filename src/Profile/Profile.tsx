import { useState } from "react";
import PostInput from "./PostInput";
import PostTimeline from "./Post/PostTimeline"
import pic from "../static/images/Joerg.jpg"
import { User } from "../App";

export interface postsInterface {
    posts: Array<string>
}

export default function Profile({user}: {user: User}) {
    const [posts, setPosts] = useState<string[]>([]);

    function submitPost(text: string) {
        setPosts(posts => [...posts, text]);
    }

    return (
        <>
            <img src={pic} alt="Profile" width="100px" height="100px"></img>
            <h1>{user.name}</h1>
            <h4>{user.description}</h4>
            <PostInput submitPost={submitPost}/>
            <PostTimeline posts={posts} />
            
        </>
    );
}