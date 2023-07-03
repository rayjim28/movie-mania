import { Component } from "react";
import { signUp } from "../../utilities/users-service";
// we need to export our class components just like always
// one of the key distinctions between classes and function components is the extends keyword
// This tells our code "get a;ll the good stuff from Component, but let me make it work for my purpose"
export default class SignUpForm extends Component {
  // Class components handle state differently than functions
  // instead of hooks, we use the class field called state
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  // handleChange method -> handles user input in the form
  // looks at the name of the input field, and updates the value associated with that input field in state
  handleChange = (evt) => {
    // we'll look at the event, gather information from the event, update state
    this.setState({
      // we can use a specific syntax, to dynamically gather data from the form
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    // This was to make this function do something for testing our component
    // alert(JSON.stringify(this.state));

    try {
      // This is where we'll run our api call
      // we'll start our api call process with a copy of the state object
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;
      // another way to handle this is with destructuring
      // const { name, email, password } = this.state
      // const formData = { name, email, password }
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // handle our errors
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };
  // Every single class component NEEDS a render method
  // This render method tells our app what this component returns
  render() {
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
                      <button
                        type="submit"
                        className="btn btn-success animate__animated animate__bounceIn"
                        disabled={disable}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
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


