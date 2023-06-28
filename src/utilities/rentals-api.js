import sendRequest from "./send-request";

const BASE_URL = "/api/rentals";

export async function getAllRentals() {
  return sendRequest(BASE_URL);
}

export async function getRentalById(rentalId) {
  return sendRequest(`${BASE_URL}/${rentalId}`);
}

export async function createRental(rentalData) {
  return sendRequest(BASE_URL, "POST", rentalData);
}

export async function updateRental(rentalId, rentalData) {
  return sendRequest(`${BASE_URL}/${rentalId}`, "PUT", rentalData);
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

export async function removeFromCart(movie) {
  return sendRequest(`${BASE_URL}/cart/${movie}`, "DELETE");
}
