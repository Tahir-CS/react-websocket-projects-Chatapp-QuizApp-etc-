// filepath: c:\Users\Tahir\Desktop\REACT PRACTICE\Websockets\server\server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
console.log('Server on ws://localhost:8080');
wss.on('connection', (ws) => {
  ws.on('message', (msg) => ws.send(`Echo: ${msg}`));
});