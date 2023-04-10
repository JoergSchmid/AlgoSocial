import { User } from "../App";
import NavBar from "./NavBar/NavBar";

export default function PageTemplate({user, avatar}: {user: User, avatar: string}) {
    return (
        <NavBar user={user} avatar={avatar} />
    );
}