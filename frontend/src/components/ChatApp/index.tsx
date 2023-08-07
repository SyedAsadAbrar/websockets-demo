import { Message } from "../../constants/types";
import "./styles.css";
import MessagesContainer from "./MessagesContainer";
import SendMessageContainer from "./SendMessageContainer";

interface ChatAppProps {
  messages: Message[];
  sendMessageHandler: Function;
}

const ChatApp = ({ messages, sendMessageHandler }: ChatAppProps) => {
  return (
    <div className="chat-app">
      <MessagesContainer messages={messages} />
      <SendMessageContainer sendMessageHandler={sendMessageHandler} />
    </div>
  );
};

export default ChatApp;
