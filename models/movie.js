const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // imdbID: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    poster: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
