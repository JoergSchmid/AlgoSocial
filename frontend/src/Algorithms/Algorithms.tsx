import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react"
import { SubmitButton, StatusField, ResultField, InputField } from "./IOComponents";
import { ADD_TASK, GET_ALL_ALGORITHMS, GET_TASK_BY_ID } from "../Requests/gqlRequests";
import { useMutation, useQuery } from "@apollo/client";
import { AlgorithmType, InputType, Status, defaultAlgorithm } from "../Profile/Profile";

export const REGEX_SINGLE = /[^0-9]/;
export const REGEX_MULTIPLE = /[^0-9,]|,,/;

export default function Algorithms() {
    const [availableAlgorithms, setAvailableAlgorithms] = useState<AlgorithmType[]>(defaultAlgorithm)
    const [algorithm, setAlgorithm] = useState<AlgorithmType>(defaultAlgorithm[0]);
    const [input, setInput] = useState<string>("");
    const [inputError, setInputError] = useState<boolean>(false);
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
    }

    const handleSubmitButton = () => {
        const INPUT_TYPE_REGEX_MAPPING = {
            [InputType.SINGLE_NUMBER]: REGEX_SINGLE,
            [InputType.NUMBER_ARRAY]: REGEX_MULTIPLE,
            [InputType.TWO_STRINGS]: / /
        }

        let regex = INPUT_TYPE_REGEX_MAPPING[algorithm.inputType];
        if (regex.test(input)) {
            setInputError(true);
            return;
        }
        setInputError(false);

        const INPUT_MAPPING = {
            [InputType.SINGLE_NUMBER]: input,
            [InputType.NUMBER_ARRAY]: input.split(",").map((num) => Number(num.trim())),
            [InputType.TWO_STRINGS]: input // ToDo, this is just a placeholder
        }

        requestNewTask({
            variables: {
                algorithm: algorithm.name,
                input: INPUT_MAPPING[algorithm.inputType]
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
            <InputField inputType={algorithm.inputType} error={inputError} setInput={setInput} />
            <br />
            <SubmitButton handleSubmitButton={handleSubmitButton} />
            <br /> <br />
            <StatusField status={status} />
            <br />
            <ResultField result={result} />
        </>
    )
}