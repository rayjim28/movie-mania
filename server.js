const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require("cors");
const rentalsRouter = require("./routes/api/rentals");
require("dotenv").config();
require("./config/database");

const app = express();

// Set up logging middleware
app.use(logger("dev"));

// Parse request bodies as JSON
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder

// Serve favicon.ico file
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, "build")));

// Enable Cross-Origin Resource Sharing (CORS)
// Allow requests from specified origins
app.use(
  cors({
    origin: ["http://localhost:3000", "https://movie-mania-e7tz.onrender.com"],
  })
);

// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require("./config/checkToken"));

const port = process.env.PORT || 3001;

// Mount API routes

// Mount the users API routes under "/api/users" path
app.use("/api/users", require("./routes/api/users"));

// Mount the rentals API routes under "/api/rentals" path
// Ensure that the user is logged in before accessing the rentals routes
const ensureLoggedIn = require("./config/ensureLoggedIn");
app.use("/api/rentals", ensureLoggedIn, rentalsRouter);

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests

// Route for all other requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
