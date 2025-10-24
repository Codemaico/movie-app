import "../css/favorites.css";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { useContext } from "react";

function Favorites() {
  const { favorites } = useContext(MovieContext);

  // Use a Set to store unique movieIds and filter out duplicates
  const uniqueFavorites = favorites.filter((movie, index, self) =>
    index === self.findIndex((m) => (
      m.movieId === movie.movieId
    ))
  );

  if (uniqueFavorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {uniqueFavorites.map((movie) => (
            <MovieCard
              movie={{ ...movie, id: movie.movieId || movie._id }}
              key={movie.movieId}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>Your Favorites is Empty</h2>
    </div>
  );
}

export default Favorites;
