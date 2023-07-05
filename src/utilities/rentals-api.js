import sendRequest from "./send-request";

// Define the base URL for the rentals API
const BASE_URL = "https://movie-mania-api.onrender.com/api/rentals";

// Function to fetch rental history from the backend
export async function getRentalHistory() {
  return sendRequest(`${BASE_URL}/orders`); // Send a GET request to retrieve rental history data
}

// Function to delete a rental
export async function deleteRental(rentalId) {
  return sendRequest(`${BASE_URL}/${rentalId}`, "DELETE"); // Send a DELETE request to delete a specific rental
}

// Function to checkout and create a rental
export async function checkout(cart) {
  return sendRequest(`${BASE_URL}/checkout`, "POST", cart); // Send a POST request to checkout and create a rental
}

// Function to get the current rental cart
export async function getCart() {
  return sendRequest(`${BASE_URL}/cart`, "GET"); // Send a GET request to retrieve the rental cart data
}

// Function to add a movie to the rental cart
export async function addToCart(movie) {
  return sendRequest(`${BASE_URL}/cart`, "PUT", movie); // Send a PUT request to add a movie to the rental cart
}

// Function to remove a movie from the rental cart
export async function removeFromCart(rentalId) {
  return sendRequest(`${BASE_URL}/cart/${rentalId}`, "DELETE"); // Send a DELETE request to remove a movie from the rental cart
}
