const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chomulationRoutes = require('./routes/chomulationRoutes');
const councilRoutes = require('./routes/councilRoutes');
const movieRoutes = require('./routes/movieRoutes')

// Import Socket Config
const { initializeSocket } = require('./config/socketConfig');

// Environment Config
dotenv.config();

// Database Connection
connectDB();

// Express App Setup
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chomulation', chomulationRoutes); // Added Chomulation Route
app.use('/api/council', councilRoutes);
app.use('/api/movies', movieRoutes);

// Initialize Socket.IO
initializeSocket(server);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
