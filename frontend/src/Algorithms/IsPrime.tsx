import { useEffect, useState } from "react";
import { ADD_TASK, GET_TASK_BY_ID } from "../Requests/gqlRequests";
import { useMutation, useQuery } from "@apollo/client";
import { InputField, ResultField, StatusField, SubmitButton } from "./IOComponents";


export default function IsPrime() {
    const [input, setInput] = useState<string>("");
    const [inputError, setInputError] = useState<boolean>(false);
    const [taskID, setTaskID] = useState<number>(-1);
    const [status, setStatus] = useState<string>("");
    const [result, setResult] = useState<string>("");

    const { data: fetchedData } = useQuery(GET_TASK_BY_ID, {
        variables: { id: taskID },
        fetchPolicy: 'no-cache',
        pollInterval: status === "calculating" ? 500 : 0
    })

    const [requestIsPrime, {
        error: isPrimeError
    }] = useMutation(ADD_TASK);

    useEffect(() => {
        if (fetchedData && fetchedData.taskById) {
            console.log("useEffect: " + fetchedData.taskById);
            setStatus(fetchedData.taskById.status.toString());
            setResult(fetchedData.taskById.result.toString());
        }
    }, [fetchedData])


    const handleSubmitButton = () => {
        const regex = /[^0-9]/;
        if (regex.test(input)) {
            setInputError(true);
            return;
        }
        setInputError(false);
        requestIsPrime({
            variables: {
                algorithm: "isprime",
                input: input
            },
            onCompleted: (data) => {
                setStatus("calculating");
                setTaskID(data.addTask.id);
            }
        });
    }

    //Logging errors
    if (isPrimeError) { console.log(isPrimeError); }

    return (
        <>
            <InputField error={inputError} setInput={setInput} />
            <br />
            <SubmitButton handleSubmitButton={handleSubmitButton} text="Check if prime" />
            <br /> <br />
            <StatusField status={status} />
            <br />
            <ResultField result={result} />
        </>
    );
}
