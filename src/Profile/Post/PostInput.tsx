import { PostType } from "../Profile";
import { Card, Button, TextField } from "@mui/material";

export default function PostInput({submitPost}: {submitPost: (post: PostType) => void}) {
    const handleSubmitButtonClick = (event: any) => {
        submitPost({title: event.target.title.value, message: event.target.message.value});
        event.preventDefault();
        event.target.title.value = "";
        event.target.message.value = "";
    }

    return (
        <Card variant="outlined" style={{width: 345, height: "auto", backgroundColor: "lightgrey"}}>
            <form onSubmit={handleSubmitButtonClick}>
                <TextField variant="standard" id="title" label="Title" sx={{width: "40ch"}}></TextField><br/>
                <TextField variant="outlined" id="message" label="Your post" margin="dense" multiline sx={{width: "40ch"}}></TextField><br/>
                <Button variant="contained" type="submit" style={{float: "right"}}>Submit Post</Button>
            </form>
        </Card>
    );
}