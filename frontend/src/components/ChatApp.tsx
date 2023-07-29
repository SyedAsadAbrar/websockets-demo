import { useState } from "react";

interface ChatAppProps {
  messages: string[];
  sendMessageHandler: Function;
}

const ChatApp = ({ messages, sendMessageHandler }: ChatAppProps) => {
  const [text, setText] = useState("");
  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
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
