const Rental = require("../../models/rental");
// Rest of the rental endpoints (getAllRentals, getRentalById, createRental, updateRental, deleteRental)

async function getAllRentals(req, res) {
  try {
    const userId = req.user._id; // Modify this line to match your user ID field
    const rentals = await Rental.find({ userId: userId });
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rentals" });
  }
}

async function getRentalById(req, res) {
  try {
    const rentalId = req.params.id;
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }
    res.json(rental);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rental" });
  }
}

async function createRental(req, res) {
  try {
    const { userId, title, rentalDate, returnDate, imdbID } = req.body;
    const rental = await Rental.create({
      userId,
      title,
      rentalDate,
      returnDate,
      imdbID,
    });
    res.status(201).json(rental);
  } catch (error) {
    console.log("There's an issue in createRental", error);
    res.status(500).json({ error: "Failed to create rental" });
  }
}

async function updateRental(req, res) {
  try {
    const rentalId = req.params.id;
    const { userId, title, rentalDate, returnDate } = req.body;
    const rental = await Rental.findByIdAndUpdate(
      rentalId,
      { userId, title, rentalDate, returnDate },
      { new: true }
    );
    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }
    res.json(rental);
  } catch (error) {
    res.status(500).json({ error: "Failed to update rental" });
  }
}

async function deleteRental(req, res) {
  try {
    const rentalId = req.params.id;
    const rental = await Rental.findByIdAndRemove(rentalId);
    if (!rental) {
      return res.status(404).json({ error: "Rental not found" });
    }
    res.json({ message: "Rental deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete rental" });
  }
}

// Get the rental cart (unpaid rental) for a user
async function getCart(req, res) {
  try {
    const userId = req.user._id; // Modify this line to match your user ID field
    const cart = await Rental.getCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

// Add a movie to the rental cart
async function addToCart(req, res) {
  try {
    const userId = req.user._id; // Modify this line to match your user ID field
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
  res.json({ message: "removeFromCart" });
}

// Checkout the rental cart and mark it as paid
async function checkout(req, res) {
  try {
    const userId = req.user._id; // Modify this line to match your user ID field
    const cart = await Rental.getCart(userId);
    cart.isPaid = true;
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to checkout" });
  }
}

module.exports = {
  getAllRentals, // getRentalById, // createRental, // updateRental, // deleteRental,
  getCart,
  addToCart,
  removeFromCart,
  checkout,
};
