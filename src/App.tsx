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
  return (
    <>
      <PageTemplate />
      <Profile user={exampleUser}/>
    </>
  );
}
