const express = require("express");
const router = express.Router();
const rentalCtrl = require("../../controllers/api/rentals");

// Define the routes for rentals
router.get("/", rentalCtrl.getAllRentals);
// router.get("/:id", rentalCtrl.getRentalById);
// router.post("/", rentalCtrl.createRental);
// router.put("/:id", rentalCtrl.updateRental);
// router.delete("/:id", rentalCtrl.deleteRental);

router.post("/checkout", rentalCtrl.checkout);
router.get("/cart", rentalCtrl.getCart);
router.put("/cart", rentalCtrl.addToCart);
router.delete("/cart", rentalCtrl.removeFromCart);

module.exports = router;
