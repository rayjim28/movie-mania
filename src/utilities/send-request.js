import { getToken } from "./users-service";

// Function to send an HTTP request to the specified URL with the given method and payload
export default async function sendRequest(url, method = "GET", payload = null) {
  // Create an options object to configure the request
  const options = { method };

  // Check if a payload is provided
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }

  // Get the token from the user's session
  const token = getToken();

  // Check if a token exists
  if (token) {
    // Ensure the headers object exists
    options.headers ||= {};

    // Add the token to the Authorization header with the 'Bearer' prefix
    options.headers.Authorization = `Bearer ${token}`;
  }

  // Send the HTTP request using fetch
  const res = await fetch(url, options);

  // Check if the response is successful (status code 2xx)
  if (res.ok) {
    return res.json(); // Return the JSON response
  } else {
    throw new Error("Bad Request"); // Throw an error for unsuccessful response
  }
}
