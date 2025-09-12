const WebSocket = require('ws');

// Step 1: Create the WebSocket server on port 8080
// Visualize: Setting up a central hub with multiple rooms (like a house with separate party rooms)
const wss = new WebSocket.Server({ port: 8080 });
console.log('Server on ws://localhost:8080');

// Step 2: Create a Map to store rooms, where each room is a Set of clients
// Visualize: A directory of rooms—each room has its own guest list
const rooms = new Map();

wss.on('connection', (ws) => {
  // Step 3: Track which room this client is in (initially none)
  // Visualize: Each guest starts outside any room
  let currentRoom = null;

  console.log('Client connected');

  // Step 4: Listen for messages from this client
  // Visualize: The guest speaks or requests to join a room
  ws.on('message', (message) => {
    const msgStr = message.toString();
    console.log(`Received: ${msgStr}`);

    // Step 5: Check if it's a join command (e.g., "join:QuizRoom")
    // Visualize: Guest says "I want to join Room X"
    if (msgStr.startsWith('join:')) {
      const roomName = msgStr.split(':')[1];
      // Leave current room if any
      if (currentRoom) {
        rooms.get(currentRoom).delete(ws);
      }
      // Join new room
      if (!rooms.has(roomName)) {
        rooms.set(roomName, new Set());
      }
      rooms.get(roomName).add(ws);
      currentRoom = roomName;
      ws.send(`Joined room: ${roomName}`);
      console.log(`Client joined room: ${roomName}`);
      return;
    }

    // Step 6: If not a join, broadcast to the current room only
    // Visualize: Guest speaks in their room—only others in that room hear it
    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom).forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) { // Exclude sender if desired
          client.send(`${msgStr}`);
        }
      });
    }
  });

  // Step 7: When a client disconnects, remove from their room
  // Visualize: Guest leaves the party, so remove from room list
  ws.on('close', () => {
    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(ws);
    }
    console.log('Client disconnected');
  });
});









































// const WebSocket = require('ws');

// // Step 1: Create the WebSocket server on port 8080
// // Visualize: Setting up a central hub (like a party host) where people can connect
// const wss = new WebSocket.Server({ port: 8080 });
// console.log('Server on ws://localhost:8080');

// // Step 2: Create a Set to store all connected clients
// // Visualize: A guest list at the party—easy to add/remove and loop through
// const clients = new Set();

// wss.on('connection', (ws) => {
//   // Step 3: When a new client connects, add them to the Set
//   // Visualize: A new guest arrives and joins the party
//   clients.add(ws);
//   console.log('Client connected. Total clients:', clients.size);

//   // Step 4: Listen for messages from this client
//   // Visualize: The guest speaks (sends a message)
//   ws.on('message', (message) => {
//     console.log(`Received from a client: ${message}`);
    
//     // Step 5: Broadcast the message to ALL connected clients (including the sender)
//     // Visualize: The host repeats the message loudly to everyone in the room
//     clients.forEach((client) => {
//       // Check if the client is still connected (ready to receive)
//       if (client.readyState === WebSocket.OPEN) {
//         // Send the message to this client
//         // Visualize: Passing the note to each guest one by one
//         client.send(`${message}`); // You can add a prefix like "User: " if needed
//       }
//     });
//   });

//   // Step 6: When a client disconnects, remove them from the Set
//   // Visualize: A guest leaves the party, so remove them from the list
//   ws.on('close', () => {
//     clients.delete(ws);
//     console.log('Client disconnected. Total clients:', clients.size);
//   });
// }); 



