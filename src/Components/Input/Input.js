import React from "react";

import "./Input.css";

function Input({ message, setMessage, sendMessage }) {
  return (
    <form className="form">
      <input 
      className="input" 
      type="text" 
      placeholder="type a message..." 
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
      />
      <button className="send-button" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
  );
}

export default Input;
