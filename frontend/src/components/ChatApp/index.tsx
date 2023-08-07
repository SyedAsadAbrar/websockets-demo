import { useContext, useState } from "react";

import { ConnectionStatus, Message } from "../../constants/types";
import { ClientIDContext } from "../../utils/ClientIdContext";
import "./styles.css";
import classNames from "classnames";
import { CONNECTION_STATUS } from "../../constants/ChatApp";
import MessagesContainer from "./MessagesContainer";

interface ChatAppProps {
  messages: Message[];
  sendMessageHandler: Function;
}

const ChatApp = ({ messages, sendMessageHandler }: ChatAppProps) => {
  const [text, setText] = useState("");

  const sendMessageToServer = () => {
    sendMessageHandler(text);
    setText("");
  };

  return (
    <div className="chat-app">
      <MessagesContainer messages={messages} />
      <input value={text} onChange={(event) => setText(event?.target.value)} />
      <button onClick={() => sendMessageToServer()} disabled={!text.length}>
        Send
      </button>
    </div>
  );
};

export default ChatApp;
