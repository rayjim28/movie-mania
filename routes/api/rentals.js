const express = require("express");
const router = express.Router();
const rentalCtrl = require("../../controllers/api/rentals");

// Define the routes for rentals
router.get("/", rentalCtrl.getAllRentals);
router.get("/:id", rentalCtrl.getRentalById);
router.post("/", rentalCtrl.createRental);
router.put("/:id", rentalCtrl.updateRental);
router.delete("/:id", rentalCtrl.deleteRental);

module.exports = router;
