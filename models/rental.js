const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rentalMovieSchema = require("./rental-item");

/**
 * Orders
 */

const rentalSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rentalDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    movies: [rentalMovieSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

rentalSchema.virtual("orderTotal").get(function () {
  return this.movies.reduce((total, item) => total + item.price, 0);
});

rentalSchema.virtual("totalQty").get(function () {
  return this.movies.length;
});

rentalSchema.statics.getCart = function (userId) {
  return this.findOneAndUpdate(
    { userId: userId, isPaid: false },
    { userId: userId },
    { upsert: true, new: true }
  ).catch((error) => {
    console.log("getCart error", error);
    throw new Error(error);
  });
};

rentalSchema.virtual("rentalId").get(function () {
  console.log("Getting rentalId");
  return this.id.slice(-6).toUpperCase();
});

// Instance method for adding an item to a rental's order (unpaid rental)
rentalSchema.methods.addMovieToRental = async function ({ cart, body }) {
  // Check if the movie already exists in the rental's movies list
  const lineItem = cart.movies.find(
    (movie) => movie.imdbID === body.movie.imdbID
  );

  if (lineItem) {
    // It already exists, so skip duplicates
    return null;
  } else {
    // Add the item to the order's movies list
    cart.movies.push({ ...body.movie });
  }
  cart.rentalDate = body.rentalDate;
  cart.returnDate = body.returnDate;
  return cart.save();
}; 

module.exports = mongoose.model("Rental", rentalSchema);
