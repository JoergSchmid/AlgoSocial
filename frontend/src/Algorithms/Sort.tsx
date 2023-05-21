import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { InputField, SubmitButton, StatusField, ResultField } from "./IOComponents";
import { ADD_TASK, GET_TASK_BY_ID } from "../Requests/gqlRequests";


export default function Sorting({ algorithm }: { algorithm: string }) {
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

    const [requestSort, {
        error: sortingError
    }] = useMutation(ADD_TASK);

    useEffect(() => {
        if (fetchedData && fetchedData.taskById) {
            console.log("useEffect: " + fetchedData.taskById);
            setStatus(fetchedData.taskById.status.toString());
            setResult(fetchedData.taskById.result.toString());
        }
    }, [fetchedData])



    const handleSubmitButton = () => {
        const regex = /[^0-9,]|,,/;
        if (regex.test(input)) {
            setInputError(true);
            return;
        }
        setInputError(false);
        let numberArray = input.split(",").map((num) => Number(num.trim()));
        requestSort({
            variables: {
                algorithm: algorithm.toLowerCase(),
                input: numberArray
            },
            onCompleted: (data) => {
                console.log(data);
                setStatus("calculating");
                setTaskID(data.addTask.id);
            }
        });
    }

    //Logging errors
    if (sortingError) { console.log(sortingError); }

    return (
        <>
            <InputField multiple={true} error={inputError} setInput={setInput} />
            <br />
            <SubmitButton handleSubmitButton={handleSubmitButton} />
            <br /> <br />
            <StatusField status={status} />
            <br />
            <ResultField result={result} />
        </>
    );
}
