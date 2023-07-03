import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  // console.log("this is setUser in Nav", setUser);
  function handleLogOut() {
    // delete the token from storage
    userService.logOut();
    // set the user to null
    setUser(null);
  }
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/movies">
          MoviesMania
        </Link>
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
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/orders"
              >
                Rental History
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies">
                Movies
              </Link>
            </li>
          </ul>
          {user && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <h5 className="navbar-text me-5">Welcome, {user.name}</h5>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies" onClick={handleLogOut}>
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