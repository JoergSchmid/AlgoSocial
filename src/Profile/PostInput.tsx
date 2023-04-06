import { useState } from "react";

type submitPostProp = {
    submitPost: (text: string) => void;
}

export default function PostInput(submitPost: submitPostProp) {
    const [textAreaValue, setTextAreaValue] = useState("")
    const handleChange = (event: any) => {
        setTextAreaValue(event.target.value);
    };

    return (
        <>
            <form onSubmit={(event) => {
                submitPost.submitPost(textAreaValue);
                event.preventDefault();
                setTextAreaValue("");
                }}>
                <textarea value={textAreaValue} onChange={handleChange}></textarea>
                <input type="submit" value={"Submit"}></input>
            </form>
            
        </>
    );
}