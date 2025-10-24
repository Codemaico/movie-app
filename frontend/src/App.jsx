import "./css/app.css";
import NavBar from "./components/NavBar";
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoutes from "./components/protectedRoutes"; // Import the component
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <MovieProvider>
        <ToastContainer />
        <NavBar />
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/movie-app/login" element={<Login />} />
            <Route path="/movie-app/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoutes />}>
              {/* These routes are only accessible to logged-in users */}
              <Route path="/movie-app" element={<Home />} />
              <Route path="/movie-app/home" element={<Home />} />
              <Route path="/movie-app/favorites" element={<Favorites />} />
              
            </Route>
          </Routes>
        </main>
      </MovieProvider>
    </UserProvider>
  );
}

export default App;
