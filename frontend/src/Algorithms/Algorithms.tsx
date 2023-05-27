import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react"
import { SubmitButton, StatusField, ResultField, InputField } from "./IOComponents";
import { ADD_TASK, GET_TASK_BY_ID } from "../Requests/gqlRequests";
import { useMutation, useQuery } from "@apollo/client";
import { AlgorithmType } from "../Profile/Profile";

const ALGORITHMS: AlgorithmType[] = [
    {
        name: "bubblesort",
        displayName: "Bubble Sort",
        inputMultiple: true
    }, {
        name: "quicksort",
        displayName: "Quick Sort",
        inputMultiple: true
    }, {
        name: "isprime",
        displayName: "Check Prime",
        inputMultiple: false
    }
]

export const REGEX_SINGLE = /[^0-9]/;
export const REGEX_MULTIPLE = /[^0-9,]|,,/;

export default function Algorithms() {
    const [algorithm, setAlgorithm] = useState<AlgorithmType>(ALGORITHMS[0]);
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

    const [requestNewTask, {
        error: requestNewTaskError
    }] = useMutation(ADD_TASK);

    useEffect(() => {
        if (fetchedData && fetchedData.taskById) {
            setStatus(fetchedData.taskById.status);
            setResult(fetchedData.taskById.result);
        }
    }, [fetchedData])

    const handleSelectionChange = (event: SelectChangeEvent) => {
        let selectedAlgorithm = ALGORITHMS.find((alg) => alg.displayName === event.target.value);
        if (selectedAlgorithm) {
            setAlgorithm(selectedAlgorithm);
        }
    }

    const handleSubmitButton = () => {
        let regex = algorithm.inputMultiple ? REGEX_MULTIPLE : REGEX_SINGLE;
        if (regex.test(input)) {
            setInputError(true);
            return;
        }
        setInputError(false);
        let requestInput = algorithm.inputMultiple ?
            input.split(",").map((num) => Number(num.trim())) : input;
        requestNewTask({
            variables: {
                algorithm: algorithm.name,
                input: requestInput
            },
            onCompleted: (data) => {
                setTaskID(data.addTask.id);
                setStatus(data.addTask.status);
            }
        });
    }

    //Logging errors
    if (requestNewTaskError) { console.log(requestNewTaskError); }

    return (
        <>
            <h3>Algorithms</h3>
            <Select
                id="algorithmSelection"
                data-testid="algorithmSelection"
                autoWidth
                value={algorithm.displayName}
                onChange={handleSelectionChange}
            >
                {ALGORITHMS.map((alg) => (
                    <MenuItem
                        key={alg.name}
                        value={alg.displayName}
                    >
                        {alg.displayName}
                    </MenuItem>
                ))}
            </Select>
            <br />
            <InputField multiple={algorithm.inputMultiple} error={inputError} setInput={setInput} />
            <br />
            <SubmitButton handleSubmitButton={handleSubmitButton} />
            <br /> <br />
            <StatusField status={status} />
            <br />
            <ResultField result={result} />
        </>
    )
}