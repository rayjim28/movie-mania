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
