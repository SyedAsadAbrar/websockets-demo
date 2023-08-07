import classNames from "classnames";
import { Message } from "../../constants/types";
import { CONNECTION_STATUS } from "../../constants/ChatApp";
import { useContext } from "react";
import { ClientIDContext } from "../../utils/ClientIdContext";

interface MessagesContainerProps {
  messages: Message[];
}

const MessagesContainer = ({ messages }: MessagesContainerProps) => {
  const clientIdFromContext = useContext(ClientIDContext);

  const getMessage = (messageObj: Message) => {
    const { clientId, message, connectionStatus } = messageObj;
    if (connectionStatus === CONNECTION_STATUS.NEW_CONNECTION) {
      if (clientId === clientIdFromContext) {
        return "You have joined the chat";
      }
      return "Someone else has joined the chat";
    } else if (connectionStatus === CONNECTION_STATUS.CLOSED) {
      if (clientId === clientIdFromContext) {
        return "You have left the chat";
      }
      return "Someone else has left the chat";
    }
    return message;
  };

  return (
    <div className="messages-container">
      {messages.map((messageObj, index) => {
        const { clientId, connectionStatus } = messageObj;
        return (
          <div
            className={classNames("msg-container", {
              right:
                clientId === clientIdFromContext &&
                connectionStatus === CONNECTION_STATUS.ONGOING,
              left:
                clientId !== clientIdFromContext &&
                connectionStatus === CONNECTION_STATUS.ONGOING,
              "chat-alert": connectionStatus !== CONNECTION_STATUS.ONGOING,
              "chat-left": connectionStatus === CONNECTION_STATUS.CLOSED,
              "chat-joined":
                connectionStatus === CONNECTION_STATUS.NEW_CONNECTION,
            })}
            key={index}
          >
            {/* {clientId === clientIdFromContext ? "You" : clientId} {`->`}{" "} */}
            {getMessage(messageObj)}
          </div>
        );
      })}
    </div>
  );
};

export default MessagesContainer;
