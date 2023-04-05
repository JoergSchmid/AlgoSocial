import React from "react";
import "./App.css";
import Basepage from "./BasePage/Basepage.jsx";
import Profile from "./Profile/Profile.jsx"

const testUser = {
  name: "Joerg",
  description: "A test user"
}

export default function App() {
  return (
    <>
      <Basepage />
      <Profile user={testUser}/>
    </>
  );
}
