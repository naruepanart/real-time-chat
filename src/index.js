import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase, { auth } from "./firebase.js";

import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        });
      }
    });
  }

  logOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then((window.location = "/"));
  };

  render() {
    return (
      <Router>
        <div className="app">
          <nav className="main-nav">
            {!this.state.user && (
              <div>
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <a className="nav-link active" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Register
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {this.state.user && (
              <ul className="nav justify-content-center">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    onClick={this.logOutUser}
                    href="/"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </nav>

          <Switch>
            <Route
              path="/"
              exact
              render={() => <Home user={this.state.user} />}
            />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const NoMatch = ({ location }) => (
  <div>No route match for {location.pathname}</div>
);

ReactDOM.render(<AppRouter />, document.getElementById("root"));
