import sendRequest from "./send-request";

const BASE_URL = "/api/rentals";

// const BASE_URL = "https://movie-mania-api.onrender.com/api/rentals";

export async function getRentalHistory() {
  return sendRequest(`${BASE_URL}/orders`);
}

export async function deleteRental(rentalId) {
  return sendRequest(`${BASE_URL}/${rentalId}`, "DELETE");
}

export async function checkout(cart) {
  return sendRequest(`${BASE_URL}/checkout`, "POST", cart);
}

export async function getCart() {
  return sendRequest(`${BASE_URL}/cart`, "GET");
}

export async function addToCart(movie) {
  return sendRequest(`${BASE_URL}/cart`, "PUT", movie);
}

export async function removeFromCart(rentalId) {
  return sendRequest(`${BASE_URL}/cart/${rentalId}`, "DELETE");
}
