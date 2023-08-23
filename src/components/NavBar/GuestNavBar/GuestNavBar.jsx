import { Link } from "react-router-dom";
import "../GuestNavBar/GuestNavBar.css";

export default function GuestNavBar() {
  // Function for handling the log in action
  async function handleLogIn() {}

  return (
    <nav className="navbar navbar-expand-lg navbar-light guest-navbar">
      <div className="container-fluid">
        {/* Brand link to the home page */}
        <Link className="navbar-brand" to="/">
          MoviesMania
        </Link>
        {/* Toggle button for collapsing the navigation */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Navigation item for the Movies page */}
            <li className="nav-item">
              <Link className="nav-link" to="/movies">
                Movies
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {/* Navigation item for the Sign Up page */}
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={handleLogIn}>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
</nav>
  );
}
