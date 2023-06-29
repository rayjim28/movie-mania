const express = require("express");
const router = express.Router();
const rentalCtrl = require("../../controllers/api/rentals");

router.post("/checkout", rentalCtrl.checkout);
router.get("/cart", rentalCtrl.getCart);
router.put("/cart", rentalCtrl.addToCart);
router.delete("/cart/:id", rentalCtrl.removeFromCart);

// Route for fetching rental history
router.get("/orders", rentalCtrl.getRentalHistory);

module.exports = router;
