import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Basepage from "./BasePage/Basepage.jsx";
import Profile from "./Profile/Profile.jsx"
import PostInput from "./Profile/PostInput.jsx";



export default function App() {
  return (
    <>
      <Basepage />
      <Profile />
      <PostInput />
    </>
  );
}
