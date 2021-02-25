import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

// Needs to be outside of the component
let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "http://localhost:5000/";

  useEffect(() => {
    // Get the url data
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // socket.emit('join', { name, room });

  }, [ENDPOINT, location.search]);

  return <div>Chat</div>;
}

export default Chat;
