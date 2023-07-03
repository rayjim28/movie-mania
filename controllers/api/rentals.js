const Rental = require("../../models/rental");
// Rest of the rental endpoints (getAllRentals, getRentalById, createRental, updateRental, deleteRental)

async function getRentalHistory(req, res) {
  try {
    const userId = req.user._id;

    console.log("Fetching rentals for user ID:", userId);
    const rentals = await Rental.find({ userId: userId, isPaid: true }).exec();
    const response = addDatesToMovies(rentals);

    res.json(response);
  } catch (error) {
    console.error(error);
    console.error("Failed to fetch rentals:", error);
    res.status(500).json({ error: "Failed to fetch rentals" });
  }
}

// Add the rental and return dates to each movie in the rental
function addDatesToMovies(rentals) {
  return rentals.map((rental) => {
    const movies = rental.movies.map((movie) => {
      return {
        returnDate: rental.returnDate,
        rentalDate: rental.rentalDate,
        ...movie.toObject(),
      };
    });
    console.log(movies);
    rental = rental.toObject();
    rental.movies = movies;
    return rental;
  });
}

// Get the rental cart (unpaid rental) for a user
async function getCart(req, res) {
  try {
    const userId = req.user._id;
    const cart = await Rental.getCart(userId);
    console.log("cart", cart);
    const response = addDatesToMovies([cart]);
    res.json(response[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

// Add a movie to the rental cart
async function addToCart(req, res) {
  try {
    const userId = req.user._id;
    const cart = await Rental.getCart(userId);
    console.log("cart", userId, cart, req.body);
    await cart.addMovieToRental({ cart, body: req.body });
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add movie to cart" });
  }
}

async function removeFromCart(req, res) {
  try {
    const userId = req.user._id;
    const cart = await Rental.getCart(userId);
    const itemId = req.params.id;
    console.log(cart.movies);
    console.log(itemId);
    cart.movies = cart.movies.filter(
      (movie) => movie.imdbID.toString() !== itemId
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to remove movie from cart" });
  }
}

// Checkout the rental cart and mark it as paid
async function checkout(req, res) {
  try {
    const userId = req.user._id;
    const cart = await Rental.getCart(userId);
    if (cart.movies.length === 0) {
      return res.status(400).json({ error: "Cannot checkout empty cart" });
    }
    cart.isPaid = true;
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to checkout" });
  }
}

module.exports = {
  getRentalHistory,
  getCart,
  addToCart,
  removeFromCart,
  checkout,
};
