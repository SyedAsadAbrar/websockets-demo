const { WebSocketServer } = require("ws");
const WebSocket = require("ws");

const clientIds = [];
const messages = [];

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    const dataObj = JSON.parse(data.toString());
    console.log("message received", dataObj);
    ws.id = dataObj.clientId;
    wss.clients.forEach((client) => {
      // originally i was sending messages to all clients except the one who sent
      // it, but there is no way to be sure on the client side whether a message has
      // been successfully sent or not and an 'ACK' mechanism must be made to ensure that
      // To keep things simple, I am sending messages to all clients and redundancy would
      // be fixed at client's end
      // https://github.com/websockets/ws#server-broadcast
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on("close", (code, reason) => {
    wss.clients.forEach((client) => {
      if (ws !== client && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            clientId: ws.id,
            message: null,
            connectionStatus: 2,
          })
        );
      }
    });
  });
});
