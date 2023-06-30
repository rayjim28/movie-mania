import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  // console.log("this is setUser in Nav", setUser);
  function handleLogOut() {
    // delete the token from storage
    userService.logOut();
    // set the user to null
    setUser(null);
  }
  return (
    <nav>
      <Link to="/orders">Rental History</Link>
      &nbsp; | &nbsp;
      <Link to="/movies">Movies</Link>
      &nbsp; | &nbsp;
      {/* <Link to="/orders/new">New Order</Link> */}
      &nbsp;&nbsp;<span>Welcome, {user.name}</span>
      &nbsp;&nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
