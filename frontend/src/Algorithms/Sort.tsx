import { DocumentNode, useMutation } from "@apollo/client";
import { useState } from "react";
import { InputField, SubmitButton, StatusField, ResultField } from "./IOComponents";


export default function Sorting({ gql }: { gql: DocumentNode }) {
    const [input, setInput] = useState<string>("");
    const [inputError, setInputError] = useState<boolean>(false);
    const [result, setResult] = useState<string | null>(null);

    const [requestBubbleSort, {
        error: sortingError,
        loading: sortingLoading
    }] = useMutation(
        gql,
        { onCompleted: (data) => { setResult(data.bubbleSort) } }
    );

    const handleSubmitButton = () => {
        const regex = /[^0-9,]|,,/;
        if (regex.test(input)) {
            setInputError(true);
            return;
        }
        setInputError(false);
        let numberArray = input.split(",").map((num) => Number(num.trim()));
        requestBubbleSort({ variables: { numbers: numberArray } });
    }

    return (
        <>
            <InputField multiple={true} error={inputError} setInput={setInput} />
            <br />
            <SubmitButton handleSubmitButton={handleSubmitButton} />
            <br /> <br />
            <StatusField loading={sortingLoading} error={sortingError} />
            <br />
            <ResultField result={result} />
        </>
    );
}
