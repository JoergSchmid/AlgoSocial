import "./App.css";
import PageTemplate from "./PageTemplate/PageTemplate";
import Profile from "./Profile/Profile"

export type User = {
  name: string,
  description: string
}

const testUser: User = {
  name: "Joerg",
  description: "A test user"
}

export default function App() {
  return (
    <>
      <PageTemplate />
      <Profile user={testUser}/>
    </>
  );
}
