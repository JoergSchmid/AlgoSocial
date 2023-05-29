import React from 'react';
import { useState } from "react";
import { AlgorithmType, PostType } from "../Profile";
import { Card, Button, TextField, CardContent, MenuItem, Select, SelectChangeEvent, Checkbox } from "@mui/material";
import { REGEX_MULTIPLE, REGEX_SINGLE } from '../../Algorithms/Algorithms';

export default function PostInput({ availableAlgorithms, algorithm, setAlgorithm, submitPost, submitTask }: {
    availableAlgorithms: AlgorithmType[],
    algorithm: AlgorithmType,
    setAlgorithm: (algorithm: AlgorithmType) => void,
    submitPost: (post: PostType) => void,
    submitTask: (post: PostType) => void
}) {
    const [title, setTitle] = useState<string>(" "); // Contains a space so it doesn´t start with an error message. Space is not really in text field.
    const [message, setMessage] = useState<string>(" ");
    const [postAlgorithm, setPostAlgorithm] = useState<boolean>(false);
    const [inputError, setInputError] = useState<boolean>(false);

    function isEmpty(text: string): boolean {
        return text === "" || text === " ";
    }

    const handleSelectionChange = (event: SelectChangeEvent) => {
        let selectedAlgorithm = availableAlgorithms.find((alg) => alg.displayName === event.target.value);
        if (selectedAlgorithm) {
            setAlgorithm(selectedAlgorithm);
        }
    }

    const handleSubmitButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEmpty(title) || isEmpty(message)) {
            return;
        }

        if (!postAlgorithm) {
            submitPost({ title, message, id: -1 });
            return;
        }

        const regex = algorithm.inputMultiple ? REGEX_MULTIPLE : REGEX_SINGLE;
        if (regex.test(message)) {
            setInputError(true);
            return;
        }

        const LARGEST_INT = 2147483647;
        if (algorithm.inputMultiple) {
            for (const num of message) {
                if (parseInt(num.trim()) > LARGEST_INT) {
                    setInputError(true);
                    return;
                }

            }
        } else if (Number(message) > LARGEST_INT) {
            setInputError(true);
            return;
        }


        setInputError(false);
        submitTask({ title, message, id: -1 })
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
                        error={message === "" || inputError}
                        helperText={message === "" || inputError ? "Invalid input" : ""}
                        margin="dense"
                        multiline
                        sx={{ width: "40ch" }}
                    ></TextField><br />
                    <Checkbox
                        id="checkboxPostAlgorithm"
                        data-testid="checkboxPostAlgorithm"
                        style={{ float: "left" }}
                        onChange={() => setPostAlgorithm(!postAlgorithm)}
                    />
                    <Select
                        id="postInputSelection"
                        data-testid="postInputSelection"
                        disabled={!postAlgorithm}
                        autoWidth
                        value={algorithm.displayName}
                        style={{ float: "left", borderRadius: "8px", marginTop: "5px", height: "48px" }}
                        onChange={handleSelectionChange}
                    >
                        {availableAlgorithms.map((alg) => (
                            <MenuItem
                                key={alg.name}
                                value={alg.displayName}
                            >
                                {alg.displayName}
                            </MenuItem>
                        ))}
                    </Select><br />
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
