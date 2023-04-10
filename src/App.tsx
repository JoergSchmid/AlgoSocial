import { useState } from "react";
import "./App.css";
import Profile from "./Profile/Profile"
import NavBar from "./NavBar/NavBar";

export type User = {
  name: string,
  description: string,
  picture: number
}

const exampleUser: User = {
  name: "Joerg",
  description: "A test user",
  picture: 0
}

export default function App() {
  const [avatar, setAvatar] = useState<string>(require("./static/images/profile_pictures/" + exampleUser.picture + ".jpg"))
  function changeAvatar(id?: number): void {
    if (!id) {
      id = (exampleUser.picture + 1) % 7;
    }
    exampleUser.picture = id;
    setAvatar(require("./static/images/profile_pictures/" + exampleUser.picture + ".jpg"));
  }

  return (
    <>
      <NavBar user={exampleUser} avatar={avatar} />
      <Profile user={exampleUser} avatar={avatar} changeAvatar={changeAvatar} />
    </>
  );
}
