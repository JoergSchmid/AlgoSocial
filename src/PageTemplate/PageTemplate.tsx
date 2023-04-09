import { User } from "../App";
import NavBar from "./NavBar/NavBar";

export default function PageTemplate({user}: {user: User}) {
    return (
        <NavBar user={user}/>
    );
}