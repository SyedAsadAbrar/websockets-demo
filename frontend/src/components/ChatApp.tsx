import { useContext, useState } from "react";
import { Message } from "../types";
import { ClientIDContext } from "../utils/ClientIdContext";

interface ChatAppProps {
  messages: Message[];
  sendMessageHandler: Function;
}

const ChatApp = ({ messages, sendMessageHandler }: ChatAppProps) => {
  const clientIdFromContext = useContext(ClientIDContext);

  const [text, setText] = useState("");

  const sendMessageToServer = () => {
    sendMessageHandler(text);
    setText("");
  };

  console.log("messages", messages);

  return (
    <div>
      <ul>
        {messages.map(({ clientId, message }) => (
          <li>
            {clientId === clientIdFromContext ? "You" : clientId} {`->`}{" "}
            {message}
          </li>
        ))}
      </ul>
      <input value={text} onChange={(event) => setText(event?.target.value)} />
      <button onClick={() => sendMessageToServer()} disabled={!text.length}>
        Send
      </button>
    </div>
  );
};

export default ChatApp;
