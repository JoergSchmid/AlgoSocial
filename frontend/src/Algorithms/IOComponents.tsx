import { Button, TextField } from "@mui/material";
import { Status } from "../Profile/Profile";


export function InputField({
    setInput,
    setSecondInput = () => { },
    showSecondInput = false,
    exampleInput1 = "Enter message",
    exampleInput2 = "",
    errorText1 = "",
    errorText2 = ""
}: {
    setInput: (input: string) => void,
    setSecondInput?: (input: string) => void,
    showSecondInput?: boolean,
    exampleInput1?: string,
    exampleInput2?: string,
    errorText1?: string,
    errorText2?: string
}) {
    return (
        <>
            <TextField
                id="input_field"
                data-testid="input_field"
                variant="outlined"
                label={exampleInput1}
                error={errorText1 !== ""}
                helperText={errorText1}
                onChange={event => setInput(event.target.value === null ? "" : event.target.value)}
                margin="dense"
                sx={{ width: "40ch" }}
            />
            {showSecondInput && <>
                <br />
                <TextField
                    id="input_field2"
                    data-testid="input_field2"
                    variant="outlined"
                    label={exampleInput2}
                    error={errorText2 !== ""}
                    helperText={errorText2}
                    onChange={event => setSecondInput(event.target.value === null ? "" : event.target.value)}
                    margin="dense"
                    sx={{ width: "40ch" }}
                />
            </>}
        </>
    );
}

export function SubmitButton({ text = "Start", handleSubmitButton }: {
    text?: string,
    handleSubmitButton: () => void
}) {
    return (
        <Button
            id="submit_algorithm"
            data-testid="submit_algorithm"
            variant="contained"
            onClick={handleSubmitButton}
        >
            {text}
        </Button>
    );
}

export function StatusField({ status }: { status: Status }) {
    return (
        <TextField
            id="query_status"
            data-testid="query_status"
            disabled
            multiline
            value={status}
        />
    );
}

export function ResultField({ result }: {
    result: string | null
}) {
    return (
        <TextField
            id="query_result"
            data-testid="query_result"
            disabled
            multiline
            value={result}
        />
    );
}