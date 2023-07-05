import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import NewOrderPage from "../NewOrderPage/NewOrderPage";
import AuthPage from "../AuthPage/AuthPage";
import RentalHistoryPage from "../RentalHistoryPage/RentalHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import MoviesPage from "../MoviesPage/MoviesPage";
import GuestNavBar from "../../components/NavBar/GuestNavBar/GuestNavBar";
import GuestMoviesPage from "../GuestMoviesPage/GuestMoviesPage";
import HomePage from "../HomePage/HomePage";
import "./App.css";

export default function App() {
  // Use state hooks to manage the user and searchMovie state
  const [user, setUser] = useState(getUser());
  const [searchMovie, setSearchMovie] = useState("");

  return (
    <main className="App">
      {user ? (
        // Render components for authenticated user
        <>
          <div>
            <NavBar user={user} setUser={setUser} />
          </div>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            {/* <Route path="/orders/new" element={<NewOrderPage />} /> */}
            <Route path="/orders" element={<RentalHistoryPage />} />
            <Route
              path="/movies"
              element={
                <MoviesPage
                  searchMovie={searchMovie}
                  setSearchMovie={setSearchMovie}
                />
              }
            />
          </Routes>
        </>
      ) : (
        // Render components for guest user
        <>
          <div>
            <GuestNavBar />
          </div>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<AuthPage setUser={setUser} />}
            ></Route>
            <Route
              path="/movies"
              element={
                <GuestMoviesPage
                  searchMovie={searchMovie}
                  setSearchMovie={setSearchMovie}
                />
              }
            />
          </Routes>
        </>
      )}
    </main>
  );
}
