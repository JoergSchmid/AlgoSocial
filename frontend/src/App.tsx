import React from 'react';
import { useState } from "react";
import "./App.css";
import Profile from "./Profile/Profile"
import NavBar from "./NavBar/NavBar";
window.React = React;

export type User = {
  userId: number,
  name: string,
  description: string,
  pictureIndex: number
}

const exampleUsers: User[] = [
  {
    userId: 0,
    name: "Joerg",
    description: "Cats cats cats!",
    pictureIndex: 0
  }, {
    userId: 1,
    name: "Sandy",
    description: "Meow <3",
    pictureIndex: 1
  }, {
    userId: 2,
    name: "Tyler",
    description: "Carry me!",
    pictureIndex: 2
  }, {
    userId: 3,
    name: "Mausi",
    description: "Love you!",
    pictureIndex: 3
  }, {
    userId: 4,
    name: "Ahri",
    description: "Cuddles!",
    pictureIndex: 4
  }, {
    userId: 5,
    name: "Kira",
    description: "Just hanging around",
    pictureIndex: 5
  }
]

export default function App({ userList = exampleUsers }: { userList?: User[] }) {
  const [user, setUser] = useState<User>(userList[0]);
  // ToDo: require() not to eslint standards. Should use import, but we only need one picture conditioned with index.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const avatar = require("./static/images/profile_pictures/" + user.pictureIndex + ".jpg");



  function changeUser(id?: number): void {
    if (!id) {
      id = (user.userId + 1) % userList.length;
    }
    setUser(exampleUsers[id]);
  }

  return (
    <>
      <NavBar avatar={avatar} />
      <Profile user={user} avatar={avatar} changeUser={changeUser} />
    </>
  );
}
