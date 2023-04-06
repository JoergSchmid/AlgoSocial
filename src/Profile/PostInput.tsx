import { useState } from "react";
import { postType } from "./Profile";

type submitPostProps = {
    submitPost: (post: postType) => void;
}

export default function PostInput(props: submitPostProps) {
    const [titleValue, setTitleValue] = useState("")
    const [messageValue, setMessageValue] = useState("")
    const handleTitleChange = (event: any) => {
        setTitleValue(event.target.value);
    };
    const handleMessageChange = (event: any) => {
        setMessageValue(event.target.value);
    };

    return (
        <>
            <form onSubmit={(event) => {
                props.submitPost({title: titleValue, message: messageValue});
                event.preventDefault();
                setTitleValue("");
                setMessageValue("");
                }}>
                <input type="text" value={titleValue} placeholder="Title" onChange={handleTitleChange}></input><br/>
                <textarea value={messageValue} placeholder="Your post..." onChange={handleMessageChange}></textarea><br/>
                <input type="submit" value={"Submit"}></input>
            </form>
            
        </>
    );
}