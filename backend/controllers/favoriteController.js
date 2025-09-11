import asyncHandler from "express-async-handler";
import Favorite from "../models/favoriesModel.js";

// @desc    Add a movie to favorites
// @route   POST /api/favorites
// @access  Private

export const addFavorite = asyncHandler(async(req, res) => {
    const { movieId, title, posterPath, overview } = req.body;

   const favoriteExists = await Favorite.findOne({ user: req.user.id, movieId });
  if (favoriteExists) {
    res.status(400);
    throw new Error("Movie already in favorites");
  }
})