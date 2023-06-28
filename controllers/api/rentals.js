const Rental = require("../../models/rental");
// Rest of the rental endpoints (getAllRentals, getRentalById, createRental, updateRental, deleteRental)

async function getAllRentals(req, res) {
  try {
    const rentals = await Rental.find();
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
    const { userId, title, rentalDate, returnDate } = req.body;
    const rental = await Rental.create({
      userId,
      title,
      rentalDate,
      returnDate,
    });
    res.status(201).json(rental);
  } catch (error) {
      console.log("There's an issue in createRental")
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
    const userId = req.user.id; // Modify this line to match your user ID field
    const cart = await Rental.getCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

// Add a movie to the rental cart
async function addToCart(req, res) {
  try {
    const userId = req.user.id; // Modify this line to match your user ID field
    const cart = await Rental.getCart(userId);
    await cart.addItemToCart(req.params.id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add movie to cart" });
  }
}

// Update the quantity of a movie in the rental cart
async function setMovieQtyInCart(req, res) {
  try {
    const userId = req.user.id; // Modify this line to match your user ID field
    const cart = await Rental.getCart(userId);
    await cart.setItemQty(req.body.movieId, req.body.newQty);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to update movie quantity in cart" });
  }
}

// Checkout the rental cart and mark it as paid
async function checkout(req, res) {
  try {
    const userId = req.user.id; // Modify this line to match your user ID field
    const cart = await Rental.getCart(userId);
    cart.isPaid = true;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to checkout" });
  }
}

module.exports = {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  getCart,
  addToCart,
  setMovieQtyInCart,
  checkout,
};




// const Rental = require("../../models/rental");

// async function getAllRentals(req, res) {
//   try {
//     const rentals = await Rental.find();
//     res.json(rentals);
//   } catch (error) {
//     res.json({ error: "Failed to fetch rentals" });
//   }
// }

// async function getRentalById(req, res) {
//   try {
//     const rentalId = req.params.id;
//     const rental = await Rental.findById(rentalId);
//     if (!rental) {
//       return res.status(404).json({ error: "Rental not found" });
//     }
//     res.json(rental);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch rental" });
//   }
// }

// async function createRental(req, res) {
//   try {
//     const { userId, title, rentalDate, returnDate } = req.body;
//     const rental = await Rental.create({ userId, title, rentalDate, returnDate });
//     res.status(201).json(rental);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create rental" });
//   }
// }

// async function updateRental(req, res) {
//   try {
//     const rentalId = req.params.id;
//     const { user, movie, rentalDate, returnDate } = req.body;
//     const rental = await Rental.findByIdAndUpdate(
//       rentalId,
//       { user, movie, rentalDate, returnDate },
//       { new: true }
//     );
//     if (!rental) {
//       return res.status(404).json({ error: "Rental not found" });
//     }
//     res.json(rental);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update rental" });
//   }
// }

// async function deleteRental(req, res) {
//   try {
//     const rentalId = req.params.id;
//     const rental = await Rental.findByIdAndRemove(rentalId);
//     if (!rental) {
//       return res.status(404).json({ error: "Rental not found" });
//     }
//     res.json({ message: "Rental deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete rental" });
//   }
// }

// module.exports = {
//   getAllRentals,
//   getRentalById,
//   createRental,
//   updateRental,
//   deleteRental,
// };
