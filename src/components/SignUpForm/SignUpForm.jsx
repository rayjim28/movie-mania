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
    isLoading: false,
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
    this.setState({ isLoading: false });
  };

  render() {
    // Determine if the Sign Up button should be disabled based on password and confirm password matching
    const disable = this.state.password !== this.state.confirm;

    return (
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card animate__animated animate__fadeIn">
              <div className="card-header text-center">
                <h4>Sign Up</h4>
              </div>
              <div className="card-body">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
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
                  <div className="text-center mt-4">
                    {this.state.isLoading ? (
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-success animate__animated animate__bounceIn"
                        disabled={disable}
                      >
                        Sign Up
                      </button>
                    )}
                  </div>
                </form>
                {this.state.error && (
                  <p className="text-danger text-center mt-3">
                    {this.state.error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
