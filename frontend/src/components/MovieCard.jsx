import "../css/moviecard.css";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(MovieContext);
  const { currentUser } = useContext(UserContext);

  // useEffect(() => {
  //   if (users.length === 0) {
  //     toast.error("Please register or login to manage favorites.");
  //   }
  // }, [users]);

  const favorite = isFavorite(movie.id);

  const toggleFavorite = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      return toast.error("Please login to manage favorites.");
    }
    // Call the correct handler based on whether the movie is already a favorite
    if (favorite) {
      removeFromFavorites(movie.id);
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
