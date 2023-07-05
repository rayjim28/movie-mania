const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

// Define the user schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password; // Remove the password field from the returned user object
        return ret;
      },
    },
  }
);

// Middleware function to hash the password before saving
userSchema.pre("save", async function (next) {
  // 'this' refers to the user document

  // Check if the password field has been modified
  if (!this.isModified("password")) return next();

  // Update the password with a new computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);

  return next();
});

// Export the User model with the defined schema
module.exports = mongoose.model("User", userSchema);
