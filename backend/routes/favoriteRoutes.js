const express = require('express')
const router = express.Router()

const { addFavorite, getFavorite} = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');


router.get("/myfav", protect, getFavorite);
router.post("/", protect, addFavorite);


module.exports = router;