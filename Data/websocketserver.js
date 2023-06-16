const express = require('express');
const ws = require('ws');

const app = express();

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  // Log a message when a new client connects
  console.log('client connected.');
  // Listen for incoming WebSocket messages
  socket.on('message', (data) => {

   // Broadcast the message to all connected clients
   wsServer.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === 1/*WebSocket.OPEN*/) {
        client.send(data.toString());
        // console.log("message",data.toString())
      }
    });
  });
  // Listen for WebSocket connection close events
  socket.on('close', () => {
    // Log a message when a client disconnects
    console.log('Client disconnected');
  });
});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(3001);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
