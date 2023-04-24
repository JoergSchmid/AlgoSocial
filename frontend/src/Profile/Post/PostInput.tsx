import React from 'react';
import { useState } from "react";
import { PostType } from "../Profile";
import { Card, Button, TextField } from "@mui/material";

export default function PostInput({ submitPost }: { submitPost: (post: PostType) => void }) {
    const [title, setTitle] = useState<string>(" "); // Contains a space so it doesn´t start with an error message. Space is not really in text field.
    const [message, setMessage] = useState<string>(" ");

    const handleSubmitButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            title: { value: string };
            message: { value: string };
        };

        if (target.title.value === "") {
            setTitle("");
            return;
        }
        if (target.message.value === "") {
            setMessage("");
            return;
        }
        submitPost({ title, message });
        target.title.value = "";
        target.message.value = "";
    }

    return (
        <Card variant="outlined" style={{ width: 345, height: "auto", backgroundColor: "lightgrey", position: "absolute" }}>
            <form onSubmit={handleSubmitButtonClick}>
                <TextField
                    variant="standard"
                    id="title"
                    label="Title"
                    onChange={event => setTitle(event.target.value)}
                    error={title === ""}
                    helperText={title === "" ? "Please enter a title." : ""}
                    sx={{ width: "40ch" }}
                ></TextField><br />
                <TextField
                    variant="outlined"
                    id="message"
                    label="Your post"
                    onChange={event => setMessage(event.target.value)}
                    error={message === ""}
                    helperText={message === "" ? "Please enter a text." : ""}
                    margin="dense"
                    multiline
                    sx={{ width: "40ch" }}
                ></TextField><br />
                <Button variant="contained" type="submit" style={{ float: "right" }}>Submit Post</Button>
            </form>
        </Card>
    );
}