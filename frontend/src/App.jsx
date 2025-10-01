import "./css/app.css";
import MovieCard from "./components/MovieCard";
import NavBar from "./components/NavBar";
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import { Route, Routes , BrowserRouter} from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import Dashboard from "./pages/dashboard";    
import Login from "./pages/login";
import Register from "./pages/register";
import './index.css';


function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie-app" element={<Home />} />
          <Route path="/movie-app/favorites" element={<Favorites />} />
          <Route path="/movie-app/dashboard" element={<Dashboard />} />
          <Route path="/movie-app/login" element={<Login />} />
          <Route path="/movie-app/register" element={<Register />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
