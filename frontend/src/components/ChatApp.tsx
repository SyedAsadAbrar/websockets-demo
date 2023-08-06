import { useState } from "react";
import { Message } from "../types";

interface ChatAppProps {
  messages: Message[];
  sendMessageHandler: Function;
}

const ChatApp = ({ messages, sendMessageHandler }: ChatAppProps) => {
  const [text, setText] = useState("");

  return (
    <div>
      <ul>
        {messages.map(({ clientId, message }) => (
          <li>
            {clientId} said {message}
          </li>
        ))}
      </ul>
      <input onChange={(event) => setText(event?.target.value)} />
      <button onClick={() => sendMessageHandler(text)} disabled={!text.length}>
        Send
      </button>
    </div>
  );
};

export default ChatApp;
