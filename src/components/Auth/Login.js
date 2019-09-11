import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="card-body">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            {error && <p className="error-message">{error.message}</p>}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
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
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
            <hr></hr>
            Don't have an account yet? <Link to="/register">Register here</Link>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default Login;
