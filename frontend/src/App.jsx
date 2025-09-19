import "./css/app.css";
import MovieCard from "./components/MovieCard";
import NavBar from "./components/NavBar";
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie-app" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
