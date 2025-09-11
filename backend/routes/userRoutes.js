const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getallUsers
} = require("../controllers/userController");


router.post("/", registerUser);

router.post("/login", loginUser);

router.get("/me", getMe);

router.get('/all', getallUsers)

module.exports = router;
