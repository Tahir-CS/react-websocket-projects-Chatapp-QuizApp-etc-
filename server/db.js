const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Message schema
const messageSchema = new mongoose.Schema({
  room: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Load history
const loadHistory = async (room) => {
  return await Message.find({ room }).sort('timestamp');
};

// Save message
const saveMessage = async (room, message) => {
  const newMsg = new Message({ room, message });
  await newMsg.save();
};

module.exports = { loadHistory, saveMessage };