import "../css/favorites.css";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = MovieContext();
  if (favorites.length > 0) {
  return (
    <div className="favorites">
      <h2>Your Favorites</h2>

      <div className="movies-grid">
        {favorites.map((movie) => (
  <MovieCard
     movie={{ ...movie, id: movie.movieId }}   // ensure `id` exists
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
