import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import AuthPage from "../AuthPage/AuthPage";
import RentalHistoryPage from "../RentalHistoryPage/RentalHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import MoviesPage from "../MoviesPage/MoviesPage";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [searchMovie, setSearchMovie] = useState("");

  return (
    <main className="App">
      {user ? (
        <>
          <div>
            <NavBar user={user} setUser={setUser} />
          </div>
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
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
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
