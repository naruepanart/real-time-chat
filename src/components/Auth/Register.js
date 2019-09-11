import React from "react";
import firebase from "../../firebase.js";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, username, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateProfile({ displayName: username })
          .then(() => {
            this.props.history.push("/");
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { email, username, password, error } = this.state;
    return (
      <div className="card-body">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <br></br>
            <h1>Register your account</h1>
            <hr></hr>
            {error && <p className="error-message">{error.message}</p>}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success btn-block">
                Get Started
              </button>
            </form>
            <hr></hr>
            Already have an account? <Link to="/login">Login here</Link>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default Register;
