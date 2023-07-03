import { useState } from "react";
import { login } from "../../utilities/users-service";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(evt) {
    // this.setState({
    //     [evt.target.name]: evt.target.value,
    //     error: ''
    // })
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  // handleSubmit
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const user = await login(credentials);
      // console.log('credentials in login', credentials)
      setUser(user);
    } catch {
      // handle our errors
      // this.setState({ error: 'Sign Up Failed - Try Again'})
      setError("Log In Failed - Try Again");
    }
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
                  <button
                    type="submit"
                    className="btn btn-primary animate__animated animate__bounceIn"
                  >
                    Log In
                  </button>
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
