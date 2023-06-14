import { Button, TextField } from "@mui/material";
import { InputType, Status } from "../Profile/Profile";


export function InputField({ inputType = InputType.SINGLE_NUMBER, error, setInput, setSecondInput, showSecondInput }: {
    inputType?: InputType,
    error: boolean,
    setInput: (input: string) => void,
    setSecondInput: (input: string) => void,
    showSecondInput: boolean
}) {
    return (
        <>
            <TextField
                id="input_field"
                data-testid="input_field"
                variant="outlined"
                error={error}
                label={"Enter algorithm input"}
                onChange={event => setInput(event.target.value === null ? "" : event.target.value)}
                margin="dense"
                sx={{ width: "40ch" }}
            />
            {showSecondInput &&
                <TextField
                    id="input_field2"
                    data-testid="input_field2"
                    variant="outlined"
                    error={error}
                    label={""}
                    onChange={event => setSecondInput(event.target.value === null ? "" : event.target.value)}
                    margin="dense"
                    sx={{ width: "40ch" }}
                />
            }
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