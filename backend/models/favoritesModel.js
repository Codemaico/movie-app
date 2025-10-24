const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    movieId: { type: String, required: true }, // TMDB or custom id
    title: { type: String, required: true },
    posterPath: { type: String },
    overview: { type: String },
  },
  { timestamps: true }
);

// Add this line to create a unique compound index
favoritesSchema.index({ user: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model("Favorites", favoritesSchema);
