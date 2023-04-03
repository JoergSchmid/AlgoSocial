import React from "react";
import Post from "./Post";

export default function PostTimeline({ posts }) {
    return (
            posts.map(post => {
                return <Post key={post} message={post} />
            })
    );
}