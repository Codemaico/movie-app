import { Link } from "react-router-dom";
import "../css/navbar.css";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brands">
          MICMovie 
        </Link>
      </div>

      <div className="navbar-links">
        <ul>
          <li>
            <Link to="/movie-app/login" className="nav-link">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/movie-app/register" className="nav-link">
              <FaUser /> Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
