import { useState } from "react";
import { login } from "../../utilities/users-service";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(evt) {
    // Update the corresponding input field value in the credentials state
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  // Handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);

    try {
      // Call the login function from the users-service utility to log in the user
      const user = await login(credentials);
      setUser(user);
    } catch {
      // Handle login errors
      setError("Log In Failed - Try Again");
    }
    setIsLoading(false);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center mt-4">
                  {isLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary animate__animated animate__bounceIn"
                    >
                      Log In
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <p className="error-message mt-3">{error}</p>
        </div>
      </div>
    </div>
  );
}
