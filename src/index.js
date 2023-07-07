import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./pages/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Create a root element for rendering the React app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app inside the root element
root.render(
  // Enable strict mode for additional checks and warnings during development
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
