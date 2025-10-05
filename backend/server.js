const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const favoriteRoutes = require("./routes/favoriteRoutes.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// routes

app.use("/users", userRoutes);
app.use("/favorites", favoriteRoutes); /// Use one clean prefix

// app.use('/login', userRoutes);

// app.use('/me', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
