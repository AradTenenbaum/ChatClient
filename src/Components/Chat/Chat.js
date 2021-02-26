import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import { useHistory } from "react-router-dom";


// Needs to be outside of the component
let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const ENDPOINT = "http://localhost:5000/";

  useEffect(() => {
    // Get the url data
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if(error) {
        alert(error);
        history.goBack();
      }
    });

    // Happens when we leave the component
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({room, users}) => {
      setUsers(users);
      console.log(users);
    });
  }, [messages, users]);

  // Function to send messages
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };


  return (
    <div className="outer-container">
            <ol className="">
              {users.map((user) => <li className="list-item">{user.name}</li>)}
            </ol>
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
