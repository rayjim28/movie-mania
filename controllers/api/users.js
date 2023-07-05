const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create a new user
async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);

    // Create a JSON Web Token (JWT) for the user
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

// Log in a user
async function login(req, res) {
  try {
    // Find the user in the database using their email
    const user = await User.findOne({ email: req.body.email });

    // Throw an error if the user is not found
    if (!user) throw new Error();

    // Compare the provided password with the stored password (using bcrypt)
    const match = await bcrypt.compare(req.body.password, user.password);

    // Log in the user if there is a match (create the token)
    if (match) {
      const token = createJWT(user);
      res.json(token);
    } else {
      throw new Error();
    }
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

// Check the validity of a token
function checkToken(req, res) {
  // req.user will always be available when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

// Create a JSON Web Token (JWT) for a user
function createJWT(user) {
  console.log("this is secret in createJWT", process.env.SECRET);
  return jwt.sign(
    // Data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

module.exports = {
  create,
  login,
  checkToken,
};
