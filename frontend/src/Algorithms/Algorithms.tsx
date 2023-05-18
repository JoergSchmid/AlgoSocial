import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react"
import IsPrime from "./IsPrime";
import BubbleSort from "./BubbleSort";


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
            <h3>Algorithms Page - WIP</h3>
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
            {algorithm === "bubblesort" && <BubbleSort />}
            {algorithm === "isPrime" && <IsPrime />}
        </>
    )
}