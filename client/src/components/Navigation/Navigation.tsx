import { Link } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
    return (
    <>
    <nav className="navbar">
        <ul className="nav-list">
            <li><Link to={"/"} className="nav-link">Form</Link></li>
            <li><Link to={"/users"} className="nav-link">Users</Link></li>
        </ul>
    </nav>
    </>
  )
}

export default Navigation;
