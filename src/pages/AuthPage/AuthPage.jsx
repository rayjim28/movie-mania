import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [userPref, setUserPref] = useState("signup");

  const navigate = useNavigate();

  // Function to toggle between sign up and log in
  function handlePref() {
    if (userPref === "signup") {
      // If currently in sign up mode, switch to log in mode
      setUserPref("login");
    } else {
      // If currently in log in mode, switch to sign up mode
      setUserPref("signup");
    }
  }

  // Function to handle successful authentication
  function handleSuccessfulAuth() {
    // Redirect the user to the HomePage after setting the user
    navigate('/');
}

return (
  <main className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            {/* Title based on user preference */}
            <h2 className="card-title mb-4" style={{ height: "5vh" }}>
              {userPref === "signup" ? "Sign Up" : "Log In"}
            </h2>
            {/* Render sign up or log in form based on user preference */}
            {userPref === "signup" ? (
              <SignUpForm setUser={user => { setUser(user); handleSuccessfulAuth(); }} />
            ) : (
              <LoginForm setUser={user => { setUser(user); handleSuccessfulAuth(); }} />
            )}
            {/* Toggle between sign up and log in */}
            <p className="text-center mt-4">
              {userPref === "signup"
                ? "Already a member? Log In"
                : "Need an account? Sign Up"}
            </p>
            <button
              className="btn btn-secondary btn-block"
              onClick={handlePref}
            >
              {/* Button text based on user preference */}
              {userPref === "signup" ? "Log In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
);
}
