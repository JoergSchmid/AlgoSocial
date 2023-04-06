import { useState } from "react";

type submitPostProp = {
    submitPost: (text: string) => void;
}

export default function PostInput(submitPost: submitPostProp) {
    const [value, setValue] = useState("")
    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    return (
        <>
            <form onSubmit={(event) => {
                submitPost.submitPost(value);
                event.preventDefault();
                setValue("");
                }}>
                <textarea value={value} onChange={handleChange}></textarea>
                <input type="submit" value={"Submit"}></input>
            </form>
            
        </>
    );
}