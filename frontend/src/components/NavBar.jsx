import { Link } from "react-router-dom"
import "../css/navbar.css"

function NavBar(){
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/" className="navbar-brand">Movie App</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/movie-app/favorites" className="nav-link">Favorites</Link>
            <Link to="/movie-app/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/movie-app/login" className="nav-link">Login</Link>
            <Link to="/movie-app/register" className="nav-link">Register</Link>
        </div>
    </nav>
}

export default NavBar