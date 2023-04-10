import { useState } from "react";
import "./App.css";
import Profile from "./Profile/Profile"
import NavBar from "./NavBar/NavBar";

export type User = {
  name: string,
  description: string,
  pictureIndex: number
}

const exampleUser: User = {
  name: "Joerg",
  description: "A test user",
  pictureIndex: 0
}

export default function App() {
  const [avatar, setAvatar] = useState<string>(require("./static/images/profile_pictures/" + exampleUser.pictureIndex + ".jpg"))
  function changeAvatar(id?: number): void {
    if (!id) {
      id = (exampleUser.pictureIndex + 1) % 7;
    }
    exampleUser.pictureIndex = id;
    setAvatar(require("./static/images/profile_pictures/" + exampleUser.pictureIndex + ".jpg"));
  }

  return (
    <>
      <NavBar avatar={avatar} />
      <Profile user={exampleUser} avatar={avatar} changeAvatar={changeAvatar} />
    </>
  );
}
