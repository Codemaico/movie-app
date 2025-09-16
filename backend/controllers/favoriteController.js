const asyncHandler = require("express-async-handler");
const Favorite = require('../models/favoritesModel.js');

// @desc    Add a movie to favorites
// @route   POST /api/favorites
// @access  Private

const addFavorite = asyncHandler(async(req, res) => {
    const { movieId, title, posterPath, overview } = req.body;

   const favoriteExists = await Favorite.findOne({ user: req.user.id, movieId });
  if (favoriteExists) {
    res.status(400);
    throw new Error("Movie already in favorites");
  }
    if (!movieId || !title) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const favorite = await Favorite.create({
    user: req.user.id,
    movieId,
    title,
    posterPath,
    overview
  });

  res.status(201).json(favorite);
});

const getFavorite = asyncHandler(async(req, res) => {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.status(200).json(favorites);
});

module.exports = {  addFavorite, getFavorite };