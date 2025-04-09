const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String, // e.g., 'text', 'audio', 'image'
      default: 'text',
    },
    sentOn: {
      type: String,
      default: new Date().toDateString()
    },
    sentAt: {
      type: String,
      default: new Date().toTimeString()
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
