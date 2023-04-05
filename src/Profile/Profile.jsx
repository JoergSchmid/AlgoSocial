import PostTimeline from "./Post/PostTimeline.jsx"
import pic from "../static/images/Joerg.jpg"
import { useState } from "react";
import PostInput from "./PostInput.jsx";


export default function Profile({user}) {
    const [posts, setPosts] = useState([]);

    const submitPost = (text) => {
        setPosts(oldPosts => [...oldPosts, text]);
    }

    return (
        <>
            <img src={pic} width="100px" height="100px"></img>
            <h1>{user.name}</h1>
            <h4>{user.description}</h4>
            <PostInput submitPost={submitPost}/>
            <PostTimeline posts={posts}/>
            
        </>
    );
}