import logo from "../../static/images/logo.png"

export default function NavBar() {
    return (
      <nav className="navBar">
        <div className="navBarIcon">
          <img src={logo} alt="Logo" height={80} width={80}/>
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