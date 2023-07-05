import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  // Function for handling the log out action
  function handleLogOut() {
    // Delete the token from storage
    userService.logOut();
    // Set the user to null
    setUser(null);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
            {/* Navigation item for the Rental History page */}
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/orders"
              >
                Rental History
              </Link>
            </li>
            {/* Navigation item for the Movies page */}
            <li className="nav-item">
              <Link className="nav-link" to="/movies">
                Movies
              </Link>
            </li>
            {/* Navigation item for the Home page */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
          {/* Render the user-specific navigation items if the user is logged in */}
          {user && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {/* Display the user's name */}
                <h5 className="navbar-text me-5">Welcome, {user.name}</h5>
              </li>
              <li className="nav-item">
                {/* Log Out link */}
                <Link className="nav-link" to="/" onClick={handleLogOut}>
                  Log Out
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
