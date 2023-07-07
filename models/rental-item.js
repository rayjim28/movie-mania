const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalMovieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imdbID: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: function () {
        // Setting a default random price between 1 and 5
        return parseFloat((Math.random() * 4 + 1).toFixed(2));
      },
    },
  },
  { timestamps: true }
);

module.exports = rentalMovieSchema;
