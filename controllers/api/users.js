const User = require("../../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function create(req, res) {
  // baby steps --> this was used to test our front end form
  // api call functionality
  // res.json({
  //   user: {
  //     name: req.body.name,
  //     email: req.body.email,
  //   },
  // });

  try {
    // add the user to the db
    const user = await User.create(req.body);

    const token = createJWT(user)
    console.log('this is the token in signup', token)
    res.json(token)

  } catch (err) {
    res.status(400).json(err);
  }
}


// function to log in a user
async function login(req, res) {
  try {
    // find the user in the db
    const user = await User.findOne({ email: req.body.email })
    // throw an error if not found
    if (!user) throw new Error()
    // compare the password(using bcrypt)
    const match = await bcrypt.compare(req.body.password, user.password)
    // log them in if theres a match (create the token)
    if (match) {
      const token = createJWT(user)
      res.json(token)
    } else {
      throw new Error()
    }
    // throw an error if there is no match
  } catch {
    res.status(400).json('Bad Credentials')
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

// // // // Helper Functions // // // //

// this is called whenever we need to create a web token
function createJWT(user) {
  console.log('this is secret in createJWT', process.env.SECRET)
  return jwt.sign(
    //data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
}

// // // // // // // // // // // // //

module.exports = {
  create,
  login,
  checkToken
};
