import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import ChatApp from "./ChatApp";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../types";

const clientId = uuidv4();

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const socket = useMemo(() => new WebSocket("ws://localhost:8080"), []);

  socket.onopen = (event) => {
    socket.send(
      JSON.stringify({ clientId: clientId, message: "Hello Server!" })
    );
  };

  // Listen for messages
  socket.onmessage = (event) => {
    console.log("message from server", JSON.parse(event.data));
    setMessages([...messages, JSON.parse(event.data)]);
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
    socket.send(JSON.stringify({ clientId: clientId, message }));
  };

  return (
    <div className="App">
      {clientId}
      <ChatApp messages={messages} sendMessageHandler={sendMessageHandler} />
    </div>
  );
};

export default App;
