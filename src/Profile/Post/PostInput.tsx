import { useState } from "react";
import { postType } from "../Profile";
import { Button, TextField } from "@mui/material";

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
    const handleSubmitButtonClick = (event: any) => {
        props.submitPost({title: titleValue, message: messageValue});
        event.preventDefault();
        setTitleValue("");
        setMessageValue("");
    }

    return (
        <>
            <TextField variant="standard" label="Title" value={titleValue} onChange={handleTitleChange} sx={{width: "40ch"}}></TextField><br/>
            <TextField variant="outlined" label="Your post" value={messageValue} onChange={handleMessageChange} margin="dense" multiline sx={{width: "40ch"}}></TextField><br/>
            <Button variant="contained" onClick={handleSubmitButtonClick}>Submit Post</Button>
        </>
    );
}