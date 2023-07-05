import { Component } from "react";
import { signUp } from "../../utilities/users-service";

export default class SignUpForm extends Component {
  // Define initial state using the class field syntax
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  // Event handler for input changes
  handleChange = (evt) => {
    // Update the corresponding state property based on the input field's name and value
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  // Event handler for form submission
  handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      // Copy the form data from state and remove unnecessary properties
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;

      // Call the signUp function from the users-service to register the user
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // Handle errors if sign up fails
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    // Determine if the Sign Up button should be disabled based on password and confirm password matching
    const disable = this.state.password !== this.state.confirm;

    return (
      <div>
        <div className="container">
          <div
            className="row justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form autoComplete="off" onSubmit={this.handleSubmit}>
                    {/* Name input field */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    {/* Email input field */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    {/* Password input field */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    {/* Confirm Password input field */}
                    <div className="mb-3">
                      <label htmlFor="confirm" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirm"
                        className="form-control"
                        name="confirm"
                        value={this.state.confirm}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    {/* Sign Up button */}
                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-success animate__animated animate__bounceIn"
                        disabled={disable}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                  {/* Error message */}
                  <p className="error-message mt-3">{this.state.error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
