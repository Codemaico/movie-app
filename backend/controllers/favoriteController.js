const asyncHandler = require("express-async-handler");
const Favorite = require('../models/favoritesModel.js');
const User = require('../models/usersModel.js');

// @desc    Add a movie to favorites
// @route   POST /api/favorites
// @access  Private

const addFavorite = asyncHandler(async(req, res) => {
    const { movieId, title, posterPath, overview } = req.body;

   const favoriteExists = await Favorite.findOne({ userId: req.user.id, movieId });
  if (favoriteExists) {
    res.status(400);
    throw new Error("Movie already in favorites");
  }
    if (!movieId || !title) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const favorite = await Favorite.create({
    userId: req.user.id,
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


const removeFavorite = asyncHandler(async(req, res) => {
    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) {
        res.status(404);
        throw new Error("Favorite not found");
    }
    if (favorite.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }
    await favorite.remove();
    res.status(204).send();
});



module.exports = {  addFavorite, getFavorite, removeFavorite };