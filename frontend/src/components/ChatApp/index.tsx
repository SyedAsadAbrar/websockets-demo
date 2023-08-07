import { useContext, useState } from "react";
import { Message } from "../../constants/types";
import { ClientIDContext } from "../../utils/ClientIdContext";
import "./styles.css";
import classNames from "classnames";

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
    <div className="chat-app">
      <div className="chat-container">
        {messages.map(({ clientId, message }, index) => (
          <div
            className={classNames("msg-container", {
              right: clientId === clientIdFromContext,
            })}
            key={index}
          >
            {/* {clientId === clientIdFromContext ? "You" : clientId} {`->`}{" "} */}
            {message}
          </div>
        ))}
      </div>
      <input value={text} onChange={(event) => setText(event?.target.value)} />
      <button onClick={() => sendMessageToServer()} disabled={!text.length}>
        Send
      </button>
    </div>
  );
};

export default ChatApp;
