import { useState } from "react";
import { IS_PRIME } from "../Requests/gqlRequests";
import { useMutation } from "@apollo/client";
import { InputField, ResultField, StatusField, SubmitButton } from "./IOComponents";


export default function IsPrime() {
    const [input, setInput] = useState<string | null>(null);
    const [isPrime, setIsPrime] = useState<boolean | null>(null);

    const [requestIsPrime, {
        error: isPrimeError,
        loading: isPrimeLoading
    }] = useMutation(
        IS_PRIME,
        { onCompleted: (data) => { setIsPrime(data.isPrime) } }
    );

    const handleSubmitButton = () => {
        requestIsPrime({ variables: { number: input } });
    }

    return (
        <>
            <InputField setInput={setInput} />
            <br />
            <SubmitButton handleSubmitButton={handleSubmitButton} text="Check if prime" />
            <br /> <br />
            <StatusField loading={isPrimeLoading} error={isPrimeError} />
            <br />
            <ResultField result={
                isPrime ? "Prime" : "Not prime"
            } />
        </>
    );
}
