import { useState } from "react";

interface SendMessageContainerProps {
  sendMessageHandler: Function;
}

const SendMessageContainer = ({
  sendMessageHandler,
}: SendMessageContainerProps) => {
  const [text, setText] = useState("");

  const sendMessageToServer = () => {
    sendMessageHandler(text);
    setText("");
  };

  return (
    <>
      <input value={text} onChange={(event) => setText(event?.target.value)} />
      <button onClick={() => sendMessageToServer()} disabled={!text.length}>
        Send
      </button>
    </>
  );
};

export default SendMessageContainer;
