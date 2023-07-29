const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    console.log("message", data.toString());
    ws.send(data.toString());
  });
});
