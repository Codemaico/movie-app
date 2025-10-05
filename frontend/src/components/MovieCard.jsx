import "../css/moviecard.css";
import { MovieContext } from "../context/MovieContext";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = MovieContext();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = (e) => {
  e.preventDefault();
  console.log("Heart clicked", movie.id); // <-- add this
  if (favorite) {
    removeFromFavorites(movie.id);
  } else {
    addToFavorites(movie);
  }
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
