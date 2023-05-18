import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react"
import IsPrime from "./IsPrime";
import Sorting from "./Sort";
import { BUBBLE_SORT, QUICK_SORT } from "../Requests/gqlRequests";


const ALGORITHMS = [
    "bubblesort",
    "quicksort",
    "isPrime"
]

export default function Algorithms() {
    const [algorithm, setAlgorithm] = useState<string>(ALGORITHMS[0]);

    const handleChange = (event: SelectChangeEvent) => {
        setAlgorithm(event.target.value);
    }

    return (
        <>
            <h3>Algorithms</h3>
            <Select
                id="algorithmSelection"
                data-testid="algorithmSelection"
                autoWidth
                value={algorithm}
                onChange={handleChange}
            >
                {ALGORITHMS.map((alg) => (
                    <MenuItem
                        key={alg}
                        value={alg}
                    >
                        {alg}
                    </MenuItem>
                ))}
            </Select>
            <br />
            {algorithm === "bubblesort" && <Sorting method={BUBBLE_SORT} />}
            {algorithm === "quicksort" && <Sorting method={QUICK_SORT} />}
            {algorithm === "isPrime" && <IsPrime />}
        </>
    )
}