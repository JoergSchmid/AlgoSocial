import { ReactComponent as Brand } from "../../logo.svg"

export default function NavBar() {
    return (
      <nav className="navBar">
        <div className="navBarIcon">
          <Brand />
        </div>
        <div>
          <a href="/">Home</a>
        </div>
        <div>
          <a href="/profile">Profile</a>
        </div>
        <div>
          <a href="/test">Test</a>
        </div>
      </nav>
    );
  }