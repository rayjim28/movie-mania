const express = require("express");
const router = express.Router();
const moviesCtrl = require("../../controllers/api/movies");

// GET /api/movies
router.get("/", moviesCtrl.fetchMovies);

module.exports = router;
