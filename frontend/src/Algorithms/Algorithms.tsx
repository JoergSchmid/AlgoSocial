import { Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
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
                hidden={algorithm !== "isPrime"}
                id="input_number"
                data-testid="input_number"
                label="Enter number"
                onChange={event => setInput(+event.target.value)}
                margin="dense"
                multiline
                sx={{ width: "40ch" }}
            />
            <TextField
                variant="outlined"
                hidden={algorithm !== "bubblesort" && algorithm !== "quicksort"}
                id="input_multiple_numbers"
                data-testid="input_multiple_numbers"
                label="Try '8,128,42,5,...'"
                onChange={event => setInput(+event.target.value)}
                margin="dense"
                multiline
                sx={{ width: "40ch" }}
            />
            <br />
            <Button
                id="submit_algorithm"
                data-testid="submit_algorithm"
                variant="contained"
            >
                Start
            </Button>

            <br /> <br />

            <TextField
                id="query_status"
                data-testid="query_status"
                label="Status:NYI"
                disabled
            />
            <br />
            <TextField
                id="query_result"
                data-testid="query_result"
                label="ResultBox"
                disabled
            />
        </>
    )
}