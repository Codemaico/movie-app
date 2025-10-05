const API_URL = "mongodb://127.0.0.1:27017/moviedb"; // adjust when you deploy

export async function fetchFavorites(token) {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load favorites");
  return res.json();
}

export async function addFavorite(movie, token) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      overview: movie.overview,
    }),
  });
  if (!res.ok) throw new Error("Failed to add favorite");
  return res.json();
}

export async function removeFavorite(movieId, token) {
  const res = await fetch(`${API_URL}/${movieId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to remove favorite");
  return res.json();
}
