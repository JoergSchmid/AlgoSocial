import React from 'react';
import { useState } from "react";
import { PostType } from "../Profile";
import { Card, Button, TextField, CardContent } from "@mui/material";

export default function PostInput({ submitPost }: { submitPost: (post: PostType) => void }) {
    const [title, setTitle] = useState<string>(" "); // Contains a space so it doesn´t start with an error message. Space is not really in text field.
    const [message, setMessage] = useState<string>(" ");

    function isEmpty(text: string): boolean {
        return text === "" || text === " ";
    }

    const handleSubmitButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEmpty(title) || isEmpty(message)) {
            return;
        }
        submitPost({ title, message, id: -1 });
    }

    return (
        <Card variant="outlined" style={{
            width: 390,
            height: "auto",
            backgroundColor: "#eeeeee",
            border: "1px solid black",
            borderRadius: '16px'
        }}>
            <CardContent>
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
                        label="Message"
                        onChange={event => setMessage(event.target.value)}
                        error={message === ""}
                        helperText={message === "" ? "Please enter a text." : ""}
                        margin="dense"
                        multiline
                        sx={{ width: "40ch" }}
                    ></TextField><br />
                    <Button
                        variant="contained"
                        type="submit"
                        data-testid="btn_submit"
                        style={{ float: "right", borderRadius: "12px", marginBottom: "5px" }}
                    >Submit Post</Button>
                </form>
            </CardContent>
        </Card>
    );
}
