import { useState } from "react";
import "./App.css";
import PageTemplate from "./PageTemplate/PageTemplate";
import Profile from "./Profile/Profile"

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
    if(!id) {
      id = (exampleUser.picture + 1) % 7;
    }
    exampleUser.picture = id;
    setAvatar(require("./static/images/profile_pictures/" + exampleUser.picture + ".jpg"));
  }

  return (
    <>
      <PageTemplate user={exampleUser} avatar={avatar}/>
      <Profile user={exampleUser} avatar={avatar} changeAvatar={changeAvatar}/>
    </>
  );
}
