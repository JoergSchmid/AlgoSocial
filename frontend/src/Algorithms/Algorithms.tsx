import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react"


const ALGORITHMS = [
    "bubblesort",
    "quicksort",
    "isPrime"
]

export default function Algorithms() {
    const [algorithm, setAlgorithm] = useState<string>(ALGORITHMS[0]);
    const [input, setInput] = useState<number | null>(null)

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
            <TextField
                variant="outlined"
                type="number"
                id="input_isPrime"
                data-testid="input_isPrime"
                label="input number for prime test"
                onChange={event => setInput(+event.target.value)}
                helperText={input === null ? "Please enter a number." : ""}
                margin="dense"
                multiline
                sx={{ width: "40ch" }}
            />
        </>
    )
}