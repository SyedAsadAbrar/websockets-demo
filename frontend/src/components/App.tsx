import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import ChatApp from "./ChatApp";

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const socket = useMemo(() => new WebSocket("ws://localhost:8080"), []);

  socket.onopen = (event) => {
    socket.send("Hello Server!");
  };

  // Listen for messages
  socket.onmessage = (event) => {
    console.log("message from server", event);
    setMessages([...messages, event.data]);
  };

  useEffect(() => {
    console.log("first render");
    return () => {
      if (socket.readyState === 1) {
        console.log("closing socket");
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    console.log("socket changed", socket);
  }, [socket]);

  const sendMessageHandler = (message: string) => {
    console.log("message sent", message);
    socket.send(message);
  };

  return (
    <div className="App">
      Test
      <ChatApp messages={messages} sendMessageHandler={sendMessageHandler} />
    </div>
  );
};

export default App;
