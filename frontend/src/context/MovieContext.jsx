import { createContext, useState, useEffect } from "react";
import { fetchFavorites, addFavorite, removeFavorite } from "../services/favorites";

// eslint-disable-next-line react-refresh/only-export-components
export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token"); // the JWT you store after login

  // Load favorites for the logged-in user
  useEffect(() => {
    if (!token) return; // skip if not logged in
    fetchFavorites(token)
      .then(setFavorites)
      .catch((err) => console.error("Failed to load favorites:", err));
  }, [token]);

  // add to favorites in DB
  const addToFavorites = async (movie) => {
    if (!token) return;
    const newFav = await addFavorite(movie, token);
    setFavorites((prev) => [...prev, newFav]);
  };

  // remove from favorites in DB
  const removeFromFavorites = async (movieId) => {
    if (!token) return;
    await removeFavorite(movieId, token);
    setFavorites((prev) => prev.filter((m) => m.movieId !== movieId));
  };

  const isFavorite = (movieId) =>
    favorites.some((movie) => movie.movieId === movieId);

  const providerValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={providerValue}>
      {children}
    </MovieContext.Provider>
  );
};
