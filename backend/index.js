const http = require('http');

const WebSocketServer = require('websocket').server;

let connection = null;

const server = http.createServer((req, res) => {
  console.log('we have a received a request');
});

const websocket = new WebSocketServer({
  httpServer: server,
});

websocket.on('request', (request) => {
  connection = request.accept(null, request.origin);
  connection.on('onopen', () => console.log('Opened'));
  connection.on('onclose', () => console.log('Closed'));
  connection.on('onmessage', (message) =>
    console.log('Receieved message', message)
  );
});

server.listen(8080, () => console.log('My server is listening at 8080'));
