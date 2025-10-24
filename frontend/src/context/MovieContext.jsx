// MovieContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { fetchFavoriteByUser, addFavorite, removeFavorite } from "../services/favorites";
import { UserContext } from "./userContext";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getFavorites = async () => {
      if (currentUser && currentUser.id && currentUser.token) {
        try {
          const userFavorites = await fetchFavoriteByUser(currentUser.id, currentUser.token);
          setFavorites(userFavorites);
        } catch (err) {
          console.error("Error fetching favorites:", err);
          toast.error("Failed to load your favorites.");
        }
      } else {
        setFavorites([]);
      }
    };
    getFavorites();
  }, [currentUser]);

  const addToFavorites = async (movie) => {
    try {
      // The `addFavorite` service function requires the movie and token
      const newFavorite = await addFavorite(movie, currentUser.token);
      setFavorites(prev => [...prev, newFavorite]);
      toast.success(`${movie.title} added to favorites!`);
    } catch (error) {
      console.error("Failed to add favorite:", error);
      toast.error("Failed to add favorite. Please try again.");
    }
  };

  const removeFromFavorites = async (movieId) => {
    try {
      await removeFavorite(movieId, currentUser.token);
      setFavorites(prev => prev.filter(fav => fav.movieId !== movieId));
      toast.info("Movie removed from favorites.");
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      toast.error("Failed to remove favorite. Please try again.");
    }
  };
  
  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.movieId === movieId);
  };

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
