import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [userPref, setUserPref] = useState("signup");

  function handlePref() {
    if (userPref === "signup") {
      setUserPref("login");
    } else {
      setUserPref("signup");
    }
  }

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4" style={{ height: "10vh" }}>
                {userPref === "signup" ? "Sign Up" : "Log In"}
              </h2>
              {userPref === "signup" ? (
                <SignUpForm setUser={setUser} />
              ) : (
                <LoginForm setUser={setUser} />
              )}
              <p className="text-center mt-4">
                {userPref === "signup"
                  ? "Already a member? Log In"
                  : "Need an account? Sign Up"}
              </p>
              <button
                className="btn btn-secondary btn-block"
                onClick={handlePref}
              >
                {userPref === "signup" ? "Log In" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );


}
