import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react"
import { SubmitButton, StatusField, ResultField, InputField } from "./IOComponents";
import { ADD_TASK, GET_ALL_ALGORITHMS, GET_TASK_BY_ID } from "../Requests/gqlRequests";
import { useMutation, useQuery } from "@apollo/client";
import { AlgorithmType, Status, defaultAlgorithm } from "../Profile/Profile";

export default function Algorithms() {
    const [availableAlgorithms, setAvailableAlgorithms] = useState<AlgorithmType[]>(defaultAlgorithm)
    const [algorithm, setAlgorithm] = useState<AlgorithmType>(defaultAlgorithm[0]);
    const [input, setInput] = useState<string>("");
    const [secondInput, setSecondInput] = useState<string>("");
    const [showSecondInput, setShowSecondInput] = useState<boolean>(false);
    const [taskID, setTaskID] = useState<number>(-1);
    const [status, setStatus] = useState<Status>(Status.DONE);
    const [result, setResult] = useState<string>("");

    const { data: fetchedAlgorithms, error: fetchedAlgorithmsError } = useQuery(GET_ALL_ALGORITHMS);

    const { data: fetchedTask } = useQuery(GET_TASK_BY_ID, {
        variables: { id: taskID },
        fetchPolicy: 'no-cache',
        pollInterval: status === Status.CALCULATING ? 500 : 0
    })

    const [requestNewTask, {
        error: requestNewTaskError
    }] = useMutation(ADD_TASK);

    useEffect(() => {
        if (fetchedTask && fetchedTask.taskById) {
            setStatus(fetchedTask.taskById.status);
            setResult(fetchedTask.taskById.result);
        }
    }, [fetchedTask])

    useEffect(() => {
        if (fetchedAlgorithms) {
            setAvailableAlgorithms(fetchedAlgorithms.allAlgorithms);
        }
    }, [fetchedAlgorithms])

    const handleSelectionChange = (event: SelectChangeEvent) => {
        let selectedAlgorithm = availableAlgorithms.find((alg) => alg.displayName === event.target.value);
        if (selectedAlgorithm) {
            setAlgorithm(selectedAlgorithm);
        }
        if (selectedAlgorithm?.numberOfInputs === 2)
            setShowSecondInput(true);
        else
            setShowSecondInput(false);
    }

    const handleSubmitButton = () => {
        const inputList = [input];
        if (showSecondInput) {
            inputList.push(secondInput);
        }
        requestNewTask({
            variables: {
                algorithm: algorithm.name,
                input: inputList
            },
            onCompleted: (data) => {
                setTaskID(data.addTask.id);
                setStatus(data.addTask.status);
            }
        });
    }

    //Logging errors
    if (requestNewTaskError) { console.log(requestNewTaskError); }
    if (fetchedAlgorithmsError) { console.log(fetchedAlgorithmsError); }

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
                {availableAlgorithms.map((alg) => (
                    <MenuItem
                        key={alg.name}
                        value={alg.displayName}
                    >
                        {alg.displayName}
                    </MenuItem>
                ))}
            </Select>
            <br />
            <InputField
                setInput={setInput}
                setSecondInput={setSecondInput}
                showSecondInput={showSecondInput}
                exampleInput1={algorithm.exampleInputs[0]}
                exampleInput2={algorithm.exampleInputs[1]}
            />
            <br />
            <SubmitButton handleSubmitButton={handleSubmitButton} />
            <br /> <br />
            <StatusField status={status} />
            <br />
            <ResultField result={result} />
        </>
    )
}