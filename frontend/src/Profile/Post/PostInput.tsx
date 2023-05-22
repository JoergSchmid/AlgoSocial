import React, { useEffect } from 'react';
import { useState } from "react";
import { PostType } from "../Profile";
import { Card, Button, TextField, CardContent, MenuItem, Select, SelectChangeEvent, Checkbox } from "@mui/material";
import { ALGORITHMS, Algorithm, REGEX_MULTIPLE, REGEX_SINGLE } from '../../Algorithms/Algorithms';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TASK, GET_TASK_BY_ID } from '../../Requests/gqlRequests';

export default function PostInput({ submitPost }: { submitPost: (post: PostType) => void }) {
    const [title, setTitle] = useState<string>(" "); // Contains a space so it doesn´t start with an error message. Space is not really in text field.
    const [message, setMessage] = useState<string>(" ");
    const [postAlgorithm, setPostAlgorithm] = useState<boolean>(false);
    const [algorithm, setAlgorithm] = useState<Algorithm>(ALGORITHMS[0]);
    const [inputError, setInputError] = useState<boolean>(false);
    const [taskID, setTaskID] = useState<number>(-1);
    const [status, setStatus] = useState<string>("");

    const { data: fetchedData } = useQuery(GET_TASK_BY_ID, {
        variables: { id: taskID },
        fetchPolicy: 'no-cache',
    })

    const [requestNewTask, {
        error: requestError
    }] = useMutation(ADD_TASK);

    useEffect(() => {
        if (fetchedData && fetchedData.taskById) {
            submitPost({ title, message: fetchedData.taskById.result, id: -1 })
        }
    }, [fetchedData])

    function isEmpty(text: string): boolean {
        return text === "" || text === " ";
    }

    const handleSelectionChange = (event: SelectChangeEvent) => {
        let selectedAlgorithm = ALGORITHMS.find((alg) => alg.displayName === event.target.value);
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

        let regex = algorithm.inputMultiple ? REGEX_MULTIPLE : REGEX_SINGLE;
        if (regex.test(message)) {
            setInputError(true);
            return;
        }
        setInputError(false);
        let requestInput = algorithm.inputMultiple ?
            message.split(",").map((num) => Number(num.trim())) : message;
        requestNewTask({
            variables: {
                algorithm: algorithm.name,
                input: requestInput
            },
            onCompleted: (data) => {
                setTaskID(data.addTask.id);
                setStatus(data.addTask.status);
            }
        });
    }

    // Logging errors
    if (requestError) { console.log(requestError) }

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
                        {ALGORITHMS.map((alg) => (
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
