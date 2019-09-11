import React from "react";
import firebase from "../../firebase";

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    };
  }

  componentDidMount() {
    const chatRef = firebase.database().ref("general");
    chatRef.on("value", snapshot => {
      const getChats = snapshot.val();
      let chats = [];
      for (let chat in getChats) {
        chats.push({
          id: chat,
          message: getChats[chat].message,
          user: getChats[chat].user,
          date: getChats[chat].timestamp
        });
      }
      this.setState({ chats });
    });
  }

  render() {
    return (
      <div className="overflow-auto" style={{ height: "400px" }}>
        <div className="card-body">
          {this.state.chats.map(chat => {
            const postDate = new Date(chat.date);
            return (
              <div key={chat.id}>
                <div className="media-body">
                  <p className="mt-0 mb-1">
                    {postDate.toLocaleString()} - {chat.user}
                  </p>
                  {chat.message}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Chatbox;
