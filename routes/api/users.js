const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

//POST route to handle a controller function(currently tbd)
router.post("/", usersCtrl.create);
// Post route to handle log in controller
router.post("/login", usersCtrl.login);
// GET /api/users/check-token
router.get('/check-token', usersCtrl.checkToken);
// Insert ensureLoggedIn on all routes that need protecting
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// we need to export our router
module.exports = router;
