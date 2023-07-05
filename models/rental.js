const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rentalMovieSchema = require("./rental-item");

// Define the rental schema
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
    movies: [rentalMovieSchema], // Array of movies in the rental
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Calculate the total order amount (sum of movie prices)
rentalSchema.virtual("orderTotal").get(function () {
  return this.movies.reduce((total, item) => total + item.price, 0);
});

// Get the total quantity of movies in the rental
rentalSchema.virtual("totalQty").get(function () {
  return this.movies.length;
});

// Get the rental cart (unpaid rental) for a user
rentalSchema.statics.getCart = function (userId) {
  return this.findOneAndUpdate(
    { userId: userId, isPaid: false },
    { userId: userId },
    { upsert: true, new: true }
  ).catch((error) => {
    throw new Error(error);
  });
};

// Get the rental ID
rentalSchema.virtual("rentalId").get(function () {
  return this.id.slice(-6).toUpperCase();
});

// Instance method for adding a movie to the rental's order (unpaid rental)
rentalSchema.methods.addMovieToRental = async function ({ cart, body }) {
  // Check if the movie already exists in the rental's movies list
  const lineItem = cart.movies.find(
    (movie) => movie.imdbID === body.movie.imdbID
  );

  if (lineItem) {
    // It already exists, so skip duplicates
    return null;
  } else {
    // Add the movie to the order's movies list
    cart.movies.push({ ...body.movie });
  }
  cart.rentalDate = body.rentalDate;
  cart.returnDate = body.returnDate;
  return cart.save();
};

// Export the Rental model with the defined schema
module.exports = mongoose.model("Rental", rentalSchema);
