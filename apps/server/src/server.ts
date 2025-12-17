import { WebSocket, WebSocketServer } from 'ws';
import messageHandler from './messageHandler';

// Constants
const HEARTBEAT_INTERVAL = 10 * 1000;
const PORT: number = +(process.env.PORT || 10000);

// Declarations
// -- Add isAlive to WebSocket
declare module 'ws' {
  interface WebSocket {
    isAlive: boolean;
  }
}

// Start WebSocketServer
const server = new WebSocketServer({ port: PORT });

server.on('connection', (socket: WebSocket, req) => {
  // New Client Onboarding
  socket.isAlive = true;
  console.log(`New client connected. Total clients: ${server.clients.size}`);

  // Message Handling
  socket.on('message', (msg: string) => {
    const ip = req.socket.remoteAddress;

    messageHandler(server, msg);
    // console.log(`Incoming message from client at ${ip}: ${msg}`);
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(server.clients));
      }
    });
  });

  // Heartbeat Handling
  socket.on('pong', () => {
    socket.isAlive = true;
  });

  // Error Handling
  socket.on('error', console.error);
});

// Server post-start
server.on('listening', () => {
  console.log(`Server is listening for clients!`);
});

// Heartbeat
const interval = setInterval(function ping() {
  server.clients.forEach(function each(socket) {
    const extendedSocket = socket as WebSocket;
    if (extendedSocket.isAlive === false) return socket.terminate();

    extendedSocket.isAlive = false;
    socket.ping();
  });
  // console.log(`Heartbeat. Connected clients: ${server.clients.size}`);
}, HEARTBEAT_INTERVAL);
