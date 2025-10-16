import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { logOut } from "../services/authService"; // This will need to be implemented
import { useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Use a state to track user login status

  useEffect(() => {
    // Check localStorage for user data or token
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    if (token) {
      // You could also fetch user data here if needed
      setUser({ token }); 
    } else {
      setUser(null);
    }
  }, []); // The empty array ensures this runs only once on component mount

  const handleLogout = () => {
    logOut(); // Call your authService logout function
    setUser(null); // Clear the user state
    navigate("/login"); // Redirect to the login page
    toast.success("Logged out successfully");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brands">
          MICMovie
        </Link>
      </div>

      <div className="navbar-links">
        <ul>
          {user ? ( // Conditionally render links based on user state
            <li>
              <Link className="nav-link" onClick={handleLogout}>
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
