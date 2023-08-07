import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import ChatApp from "./ChatApp";
import { Message } from "../constants/types";
import { v4 as uuidv4 } from "uuid";

import { ClientIDContext } from "../utils/ClientIdContext";
import { CONNECTION_STATUS } from "../constants/ChatApp";

const clientId = uuidv4();

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const socket = useMemo(() => new WebSocket("ws://localhost:8080"), []);

  socket.onopen = (event) => {
    const message: Message = {
      clientId,
      message: null,
      connectionStatus: CONNECTION_STATUS.NEW_CONNECTION,
    };
    socket.send(JSON.stringify(message));
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
    const messageObj: Message = {
      clientId,
      message,
      connectionStatus: CONNECTION_STATUS.ONGOING,
    };
    socket.send(JSON.stringify(messageObj));
  };

  return (
    <ClientIDContext.Provider value={clientId}>
      <div className="App">
        {clientId}
        <ChatApp messages={messages} sendMessageHandler={sendMessageHandler} />
      </div>
    </ClientIDContext.Provider>
  );
};

export default App;
