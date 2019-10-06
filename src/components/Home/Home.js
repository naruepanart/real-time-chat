import React from "react";
import firebase from "../../firebase";
import Chatbox from "./Chatbox";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const chatRef = firebase.database().ref("general");
    const chat = {
      message: this.state.message,
      user: this.props.user.displayName,
      timestamp: new Date().getTime()
    };
    chatRef.push(chat);
    this.setState({ message: "" });
  };

  render() {
    return (
      <div>
        {this.props.user && (
          <div>
            <div className="card-body">
              <Chatbox />
              <br></br>
              <br></br>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="message"
                  className="form-control"
                  id="message"
                  value={this.state.message}
                  onChange={this.handleChange}
                  placeholder="Leave a message..."
                />
              </form>
            </div>{" "}
          </div>
        )}
        <hr></hr>
        <br></br>

        {!this.props.user && (
          <div
            className="shadow-sm p-3 mb-5 bg-white rounded"
            style={{ textAlign: "center" }}
          >
            <p>
              <Link to="/login">Login</Link> or{" "}
              <Link to="/register">Register</Link> to start chatting!
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
