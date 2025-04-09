const { Server } = require('socket.io');
const { registerSocketRoutes } = require('../routes/socketRoutes');

// Initialize Socket.IO
let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        },
    });

    // Register all socket routes
    registerSocketRoutes(io);

    console.log('Socket.IO initialized');
};

// Provide IO instance globally
const getIO = () => {
    if (!io) throw new Error('Socket.IO not initialized');
    return io;
};

module.exports = { initializeSocket, getIO };
