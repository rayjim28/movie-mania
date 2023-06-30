const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * order: {
 *  _id: "1234",
 *  userId: "1234",
 *  rentalDate: "2020-12-01",
 *  returnDate: "2020-12-02",
 *  lineItems: [{
 *  title: "The Matrix",
 *  imdbID: "tt0133093",
 *  orderId: "1234",
 *  poster: "https://m.media-amazon.com/images/M/MV5BMTczMTM5NjA4Ml5BMl5BanBnXkFtZTYwNzY5Nzg3._V1_.jpg",
 * }]
 * }
 */

/**
 * Line Items
 */
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
        return parseFloat((Math.random() * 4 + 1).toFixed(2));
      },
    },
  },
  { timestamps: true }
);

module.exports = rentalMovieSchema;
