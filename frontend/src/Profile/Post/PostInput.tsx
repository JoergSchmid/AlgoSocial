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
    const [title, setTitle] = useState<string>(" "); // Contains a space so it doesn´t start with an error message. Space is not really in text field.
    const [message, setMessage] = useState<string>(" ");
    const [secondInput, setSecondInput] = useState<string>("");
    const [showSecondInput, setShowSecondInput] = useState<boolean>(false);
    const [postAlgorithm, setPostAlgorithm] = useState<boolean>(false);

    function isEmpty(text: string): boolean {
        return text === "" || text === " ";
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
        updateShowSecondInput();
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
                        error={title === ""}
                        helperText={title === "" ? "Please enter a title." : ""}
                        sx={{ width: "40ch" }}
                    ></TextField><br />
                    {postAlgorithm ?
                        <InputField
                            setInput={setMessage}
                            setSecondInput={setSecondInput}
                            showSecondInput={showSecondInput}
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
