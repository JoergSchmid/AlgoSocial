import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react"
import IsPrime from "./IsPrime";


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

            {algorithm === "isPrime" && <IsPrime />}

            <TextField
                id="input_multiple_numbers"
                data-testid="input_multiple_numbers"
                variant="outlined"
                hidden={algorithm !== "bubblesort" && algorithm !== "quicksort"}
                label="Try '8,128,42,5,...'"
                /*onChange={event => setInput(+event.target.value)}*/
                margin="dense"
                sx={{ width: "40ch" }}
            />

        </>
    )
}