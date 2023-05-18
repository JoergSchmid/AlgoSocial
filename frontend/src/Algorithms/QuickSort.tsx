import { useMutation } from "@apollo/client";
import { useState } from "react";
import { BUBBLE_SORT } from "../Requests/gqlRequests";
import { InputField, SubmitButton, StatusField, ResultField } from "./IOComponents";


export default function QuickSort() {
    const [input, setInput] = useState<string>("");
    const [result, setResult] = useState<string | null>(null);

    const [requestQuickSort, {
        error: quickSortError,
        loading: quickSortLoading
    }] = useMutation(
        BUBBLE_SORT,
        { onCompleted: (data) => { setResult(data.bubbleSort) } }
    );

    const handleSubmitButton = () => {
        const regex = /[^0-9,]|,,/;
        if (regex.test(input)) {
            return;
        }
        let numberArray = input.split(",").map((num) => Number(num.trim()));
        requestQuickSort({ variables: { numbers: numberArray } });
    }

    return (
        <>
            <InputField multiple={true} setInput={setInput} />
            <br />
            <SubmitButton handleSubmitButton={handleSubmitButton} />
            <br /> <br />
            <StatusField loading={quickSortLoading} error={quickSortError} />
            <br />
            <ResultField result={result} />
        </>
    );
}
