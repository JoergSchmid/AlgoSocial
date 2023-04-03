import { useState } from "react";

export default function PostInput({submitPost}) {
    const [value, setValue] = useState("")
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <form onSubmit={(event) => {
                submitPost(value);
                event.preventDefault();
                }}>
                <textarea value={value} onChange={handleChange}></textarea>
                <input type="submit" value={"Submit"}></input>
            </form>
            
        </>
    );
}