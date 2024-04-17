
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: String,
    text: String,
    room: String,
})

const Message = mongoose.model('Message',messageSchema);
module.exports = Message;