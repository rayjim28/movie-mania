// Import all named exports from "users-api.js"
import * as usersApi from "./users-api";

// Function to sign up a new user
export async function signUp(userData) {
  console.log("this is userData in service", userData);

  // Delegate the network request code to the users-api.js API Module
  // Which will ultimately return a JSON web Token
  const token = await usersApi.signUp(userData);

  // Save the token to local storage
  localStorage.setItem("token", token);

  // Return the user data
  return getUser();
}

// Function to log in a user
export async function login(credentials) {
  try {
    // Call the login function from users-api.js
    const token = await usersApi.login(credentials);

    // Save the token to local storage
    localStorage.setItem("token", token);

    // Return the user data
    return getUser();
  } catch {
    // Throw an error if login fails
    throw new Error("Bad Credentials");
  }
}

// Function to get the token from local storage
export function getToken() {
  // Get the token from local storage
  const token = localStorage.getItem("token");

  // If no token exists, return null
  if (!token) return null;

  // Decode the payload of the token
  const payload = JSON.parse(atob(token.split(".")[1]));

  // Check if the token has expired
  if (payload.exp < Date.now() / 1000) {
    // Token is expired, remove it from local storage
    localStorage.removeItem("token");
    return null;
  }

  // Return the token
  return token;
}

// Function to get the user data from the token
export function getUser() {
  // Get the token
  const token = getToken();

  // If a token exists, return the user data from the payload
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

// Function to log out a user
export function logOut() {
  // Remove the token from local storage
  localStorage.removeItem("token");
}

// Function to check the validity of a token
export function checkToken() {
  // Call the checkToken function from users-api.js and return a Promise
  return usersApi.checkToken().then((dateStr) => new Date(dateStr));
}
