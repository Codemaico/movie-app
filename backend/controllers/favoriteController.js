const Favorite = require("../models/favoritesModel");

// @desc    Get all favorites for logged-in user
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
};

// @desc    Add new favorite
// @route   POST /api/favorites
// @access  Private
const addFavorite = async (req, res) => {
  const { movieId, title, posterPath, overview } = req.body;

  if (!movieId || !title) {
    return res.status(400).json({ message: "Missing movie details" });
  }

  try {
    const existing = await Favorite.findOne({ movieId, user: req.user.id });
    if (existing)
      return res.status(400).json({ message: "Already in favorites" });

    const favorite = await Favorite.create({
      user: req.user.id,
      movieId,
      title,
      posterPath,
      overview,
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Failed to add favorite" });
  }
};

// @desc    Remove a favorite by ID
// @route   DELETE /api/favorites/:id
// @access  Private
const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!favorite)
      return res.status(404).json({ message: "Favorite not found" });

    res.json({ message: "Favorite removed", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove favorite" });
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
