const express = require("express");
const router = express.Router();
const rentalCtrl = require("../../controllers/api/rentals");

// Endpoint for checking out the rental cart
router.post("/checkout", rentalCtrl.checkout);

// Endpoint for getting the rental cart
router.get("/cart", rentalCtrl.getCart);

// Endpoint for adding a movie to the rental cart
router.put("/cart", rentalCtrl.addToCart);

// Endpoint for removing a movie from the rental cart
router.delete("/cart/:id", rentalCtrl.removeFromCart);

// Endpoint for fetching rental history
router.get("/orders", rentalCtrl.getRentalHistory);

module.exports = router;
