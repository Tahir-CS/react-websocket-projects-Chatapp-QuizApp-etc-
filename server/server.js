const WebSocket = require('ws');
const { loadHistory, saveMessage } = require('./db');

// ...existing code...
// Step 1: Create the WebSocket server on port 8080
// Visualize: Setting up a central hub with multiple rooms (like a house with separate party rooms)
const wss = new WebSocket.Server({ port: 8080 });
console.log('Server on ws://localhost:8080');

// Step 2: Create a Map to store rooms, where each room is a Set of clients
// Visualize: A directory of rooms—each room has its own guest list
const rooms = new Map();

// New: Map for user names
const userNames = new Map();

wss.on('connection', (ws) => {
  // ...existing code...
  // Step 3: Track which room this client is in (initially none)
  // Visualize: Each guest starts outside any room
  let currentRoom = null;

  console.log('Client connected');

  // Step 4: Listen for messages from this client
  // Visualize: The guest speaks or requests to join a room
  ws.on('message', async (message) => {
    const msgStr = message.toString();
    console.log(`Received: ${msgStr}`);

    // New: Handle name setting
    if (msgStr.startsWith('name:')) {
      const name = msgStr.split(':')[1];
      userNames.set(ws, name);
      return;
    }

    // ...existing code...
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
      
      // New: Load message history from DB
      // Visualize: Pull old messages for the room
      const msgs = await loadHistory(roomName);
      msgs.forEach(msg => ws.send(msg.message));
      
      return;
    }

    // ...existing code...
    // Step 6: If not a join, save to DB and broadcast to the current room only
    // Visualize: Guest speaks in their room—only others in that room hear it
    if (currentRoom && rooms.has(currentRoom)) {
      // New: Save message to DB
      // Visualize: Store in the cloud database
      await saveMessage(currentRoom, msgStr);
      
      // Existing broadcast logic
      const senderName = userNames.get(ws) || 'Anonymous';
      rooms.get(currentRoom).forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) { // Exclude sender if desired
          client.send(`${senderName}: ${msgStr}`);
        }
      });
    }
  });

  // ...existing code...
  // Step 7: When a client disconnects, remove from their room
  // Visualize: Guest leaves the party, so remove from room list
  ws.on('close', () => {
    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(ws);
    }
    userNames.delete(ws);
    console.log('Client disconnected');
  });
});