// Store messages in an object where key is roomID and value is an array of messages
const messageHistory = {};

module.exports = (io, socket) => {
  // Join Room
  socket.on('joinRoom', ({ room }) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);

    // Send previous messages to the newly connected user (if any)
    if (messageHistory[room]) {
      messageHistory[room].forEach((message) => {
        socket.emit('lastMessages', message); // Emit each message stored in history
      });
    }
  });

  // Send Message
  socket.on('sendMessage', ({ sender, receiver, message, room }) => {
    console.log(message + " from chat by " + sender + " to " + receiver + " in room: " + room);

    // Save the message to messageHistory for the room
    const newMessage = { sender, message };
    if (!messageHistory[room]) {
      messageHistory[room] = []; // If room doesn't exist, create a new array
    }
    messageHistory[room].push(newMessage);

    // Emit the message to all clients in the room
    io.to(room).emit('receiveMessage', newMessage);
  });
};
