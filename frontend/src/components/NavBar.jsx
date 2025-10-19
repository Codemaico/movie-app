import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"; // Import useContext
import { UserContext } from "../context/userContext"; // Import your context
import "../css/navbar.css";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

function NavBar() {
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useContext(UserContext); // Consume the context

  const handleLogout = () => {
    logoutUser(); // Call the logout function from context
    navigate("/movie-app/login");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/movie-app" className="navbar-brands">
          MICMovie
        </Link>
      </div>

      <div className="navbar-links">
        <ul>
          {currentUser ? ( // Check for currentUser from the context
            <li>
              <Link to="/movie-app" className="nav-link" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </Link>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
