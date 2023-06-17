import React from 'react';
import { useState } from "react";
import { AlgorithmType, PostType } from "../Profile";
import { Card, Button, TextField, CardContent, MenuItem, Select, SelectChangeEvent, Checkbox } from "@mui/material";
import { InputField } from '../../Algorithms/IOComponents';

export default function PostInput({ availableAlgorithms, algorithm, setAlgorithm, submitPost, submitTask }: {
    availableAlgorithms: AlgorithmType[],
    algorithm: AlgorithmType,
    setAlgorithm: (algorithm: AlgorithmType) => void,
    submitPost: (post: PostType) => void,
    submitTask: (post: PostType, secondInput: string) => void
}) {
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [secondInput, setSecondInput] = useState<string>("");
    const [showSecondInput, setShowSecondInput] = useState<boolean>(false);
    const [postAlgorithm, setPostAlgorithm] = useState<boolean>(false);
    const [inputErrorTitle, setInputErrorTitle] = useState<boolean>(false);
    const [inputErrorMessage, setInputErrorMessage] = useState<boolean>(false);
    const [inputErrorSecondInput, setInputErrorSecondInput] = useState<boolean>(false);

    function checkInputFieldsEmpty(): boolean {
        if (title === "") {
            setInputErrorTitle(true);
        } else if (message === "") {
            setInputErrorTitle(false);
            setInputErrorMessage(true);
        } else if (showSecondInput && secondInput === "") {
            setInputErrorTitle(false);
            setInputErrorMessage(false);
            setInputErrorSecondInput(true);
        } else {
            return false;
        }
        return true;
    }

    const updateShowSecondInput = () => {
        if (algorithm.numberOfInputs === 2) {
            setShowSecondInput(true);
        } else {
            setShowSecondInput(false);
            setSecondInput("");
        }
    }

    const handleSelectionChange = (event: SelectChangeEvent) => {
        let selectedAlgorithm = availableAlgorithms.find((alg) => alg.displayName === event.target.value);
        if (selectedAlgorithm) {
            setAlgorithm(selectedAlgorithm);
        }
        updateShowSecondInput(); // ToDo: sometimes this fails somehow
    }

    const handleSubmitButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (checkInputFieldsEmpty())
            return;

        if (!postAlgorithm) {
            submitPost({ title, message, id: -1 });
            return;
        }

        submitTask({ title, message, id: -1 }, secondInput)
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
                        error={inputErrorTitle}
                        helperText={inputErrorTitle ? "Please enter a title." : ""}
                        sx={{ width: "40ch" }}
                    ></TextField><br />
                    {postAlgorithm ?
                        <InputField
                            setInput={setMessage}
                            setSecondInput={setSecondInput}
                            showSecondInput={showSecondInput}
                            exampleInput1={algorithm.exampleInputs[0]}
                            exampleInput2={algorithm.exampleInputs[1]}
                            errorText1={inputErrorMessage ? "Please enter some values." : ""}
                            errorText2={inputErrorSecondInput ? "Please enter some values." : ""}
                        />
                        :
                        <InputField
                            setInput={setMessage}
                        />
                    }
                    <Checkbox
                        id="checkboxPostAlgorithm"
                        data-testid="checkboxPostAlgorithm"
                        style={{ float: "left" }}
                        onChange={() => { setPostAlgorithm(!postAlgorithm); updateShowSecondInput(); }}
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
