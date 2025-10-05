import "../css/moviecard.css";
import { useContext, useEffect } from 'react';
import { MovieContext } from "../context/MovieContext";
import { userContext } from "../context/userContext";
import { toast } from "react-toastify";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(MovieContext);
  const {users} = useContext(userContext);

  // useEffect(() => {
  //   if (users.length === 0) {
  //     toast.error("Please register or login to manage favorites.");
  //   }
  // }, [users]);

  const favorite = isFavorite(movie.id);

  const toggleFavorite = (e) => {
  e.preventDefault();
  console.log("Heart clicked", movie.id); // <-- add this
  if (users.length === 0) {
    return toast.error("Please login to manage favorites.");
  }
  favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
};


  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={toggleFavorite}
          >
            ♥︎
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
