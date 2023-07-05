const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
// require the authorization middleware function
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST route for user creation
router.post("/", usersCtrl.create);

// POST route for user login
router.post("/login", usersCtrl.login);

// GET route for checking token validity
router.get("/check-token", usersCtrl.checkToken);

// Insert ensureLoggedIn middleware to protect the routes
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

// Export the router
module.exports = router;
