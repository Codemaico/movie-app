const express = require('express')
const router = express.Router()

const { addFavorite, getFavorite, removeFavorite} = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');


router.route('/').get(protect, getFavorite).post(protect, addFavorite);
router.route('/:id').delete(protect, removeFavorite);


module.exports = router;