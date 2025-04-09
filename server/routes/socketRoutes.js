const chatController = require('../controllers/chatController');
const moodController = require('../controllers/moodController');

const registerSocketRoutes = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Register Chat Events
    chatController(io, socket);

    // Register Mood Events
    moodController(io, socket);

    // Disconnect Event
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = { registerSocketRoutes };
