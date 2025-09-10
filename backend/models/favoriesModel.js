const mongoose = require("mongoose");   

const favoritesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Favorites', favoritesSchema)