const API_URI = "/favorites/"; // adjust when you deploy

export async function fetchFavoriteByUser(userId, token) {
  const res = await fetch(`${API_URI}${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load favorites");
  return res.json();
}

export async function addFavorite(movie, token) {
  const res = await fetch(API_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      overview: movie.overview,
    }),
  });
  if (!res.ok) throw new Error("Failed to add favorites");
  return res.json();
}

export async function removeFavorite(movieId, token) {
  const res = await fetch(`${API_URI}${movieId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to remove favorites");
  return res.json();
}

const favoritesService = {
  fetchFavoriteByUser,
  addFavorite,
  removeFavorite
};

export default favoritesService;