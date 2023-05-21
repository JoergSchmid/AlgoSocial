import { ApolloError } from "@apollo/client";
import { Button, TextField } from "@mui/material";


export function InputField({ multiple = false, error, setInput }: {
    multiple?: boolean,
    error: boolean,
    setInput: (input: string) => void
}) {
    return (
        <TextField
            id="input_field"
            data-testid="input_field"
            variant="outlined"
            error={error}
            label={multiple ? "Enter numbers" : "Enter number"}
            onChange={event => setInput(event.target.value === null ? "" : event.target.value)}
            margin="dense"
            sx={{ width: "40ch" }}
        />
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

export function StatusField({ loading, error }: {
    loading: boolean,
    error: ApolloError | undefined
}) {
    return (
        <TextField
            id="query_status"
            data-testid="query_status"
            disabled
            multiline
            value={
                error ? error.message :
                    loading ? "loading..." : ""
            }
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