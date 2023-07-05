import sendRequest from "./send-request";

// Define the base URL for user-related API endpoints
const BASE_URL = "https://movie-mania-api.onrender.com/api/users";

// Function to sign up a new user
export async function signUp(userData) {
  return sendRequest(`${BASE_URL}/`, "POST", userData);
}

// Function to log in a user
export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

// Function to check the validity of a token
export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
