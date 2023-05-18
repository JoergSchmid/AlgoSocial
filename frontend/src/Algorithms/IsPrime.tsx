import { useState } from "react";
import { IS_PRIME } from "../Requests/gqlRequests";
import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";


export default function IsPrime() {
    const [input, setInput] = useState<number | null>(null);
    const [isPrime, setIsPrime] = useState<boolean | null>(null);

    const [requestIsPrime, {
        error: isPrimeError,
        loading: isPrimeLoading
    }] = useMutation(
        IS_PRIME,
        { onCompleted: (data) => { setIsPrime(data.isPrime) } }
    );

    const handleStartButton = () => {
        requestIsPrime({ variables: { number: input } });
    }

    return (
        <>
            <TextField
                id="input_number"
                data-testid="input_number"
                variant="outlined"
                label="Enter number"
                onChange={event => setInput(+event.target.value)}
                margin="dense"
                sx={{ width: "40ch" }}
            />
            <br />
            <Button
                id="submit_algorithm"
                data-testid="submit_algorithm"
                variant="contained"
                onClick={handleStartButton}
            >
                Start
            </Button>
            <br /> <br />

            <TextField
                id="query_status"
                data-testid="query_status"
                disabled
                multiline
                value={
                    isPrimeError ? isPrimeError.message :
                        isPrimeLoading ? "loading..." : ""
                }
            />
            <br />
            <TextField
                id="isPrime_result"
                data-testid="isPrime_result"
                disabled
                value={isPrime !== null ? isPrime : ""}
            />
        </>
    );
}
