const mongoose = require('mongoose');

// Step 1: Connect to MongoDB (local or Atlas URL)
// Visualize: Connecting to a cloud database
mongoose.connect('mongodb://localhost:27017/chatdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Step 2: Define Message schema
const messageSchema = new mongoose.Schema({
  room: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Function to load history
const loadHistory = async (room) => {
  return await Message.find({ room }).sort('timestamp');
};

// Function to save message
const saveMessage = async (room, message) => {
  const newMsg = new Message({ room, message });
  await newMsg.save();
};

module.exports = { loadHistory, saveMessage };