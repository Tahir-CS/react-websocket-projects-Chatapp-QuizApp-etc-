const WebSocket = require('ws');

// Step 1: Create the WebSocket server on port 8080
// Visualize: Setting up a central hub (like a party host) where people can connect
const wss = new WebSocket.Server({ port: 8080 });
console.log('Server on ws://localhost:8080');

// Step 2: Create a Set to store all connected clients
// Visualize: A guest list at the party—easy to add/remove and loop through
const clients = new Set();

wss.on('connection', (ws) => {
  // Step 3: When a new client connects, add them to the Set
  // Visualize: A new guest arrives and joins the party
  clients.add(ws);
  console.log('Client connected. Total clients:', clients.size);

  // Step 4: Listen for messages from this client
  // Visualize: The guest speaks (sends a message)
  ws.on('message', (message) => {
    console.log(`Received from a client: ${message}`);
    
    // Step 5: Broadcast the message to ALL connected clients (including the sender)
    // Visualize: The host repeats the message loudly to everyone in the room
    clients.forEach((client) => {
      // Check if the client is still connected (ready to receive)
      if (client.readyState === WebSocket.OPEN) {
        // Send the message to this client
        // Visualize: Passing the note to each guest one by one
        client.send(`${message}`); // You can add a prefix like "User: " if needed
      }
    });
  });

  // Step 6: When a client disconnects, remove them from the Set
  // Visualize: A guest leaves the party, so remove them from the list
  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected. Total clients:', clients.size);
  });
}); 