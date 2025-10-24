// favoritesRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Favorites = require("../models/favoritesModel");

// @desc    Add a movie to favorites
// @route   POST /api/favorites
// @access  Private
router.post("/", protect, async (req, res) => {
  const { movieId, title, posterPath, overview } = req.body;
  try {
    const favorite = await Favorites.create({
      user: req.user.id, // Get user ID from the token via middleware
      movieId,
      title,
      posterPath,
      overview,
    });
    res.status(201).json(favorite);
  } catch (error) {
    console.error("Error creating favorite:", error);
    res.status(500).json({ message: "Failed to add favorite" });
  }
});

// @desc    Get favorites for a specific user
// @route   GET /api/favorites/:userId
// @access  Private
router.get("/:userId", protect, async (req, res) => {
  try {
    // Ensure the token's user ID matches the requested user ID
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "Not authorized to view these favorites" });
    }
    const favorites = await Favorites.find({ user: req.params.userId });
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites by user:", error);
    res.status(500).json({ message: "Failed to load favorites" });
  }
});

// @desc    Remove a movie from favorites
// @route   DELETE /api/favorites/:movieId
// @access  Private
router.delete("/:movieId", protect, async (req, res) => {
  try {
    const favorite = await Favorites.findOne({
      user: req.user.id,
      movieId: req.params.movieId,
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await favorite.deleteOne();
    res.status(200).json({ id: req.params.movieId });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Failed to remove favorite" });
  }
});

module.exports = router;
