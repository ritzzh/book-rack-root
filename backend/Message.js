
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    room: String,
    time: Date,
})

const Message = mongoose.model('Message',messageSchema);
module.exports = Message;