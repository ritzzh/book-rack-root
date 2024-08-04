// index.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const axios = require('axios');
require('dotenv').config({ path: './.env' });

const Message = require("./models/Message");
const Blog = require("./models/Blog");
const leaveRoom = require("./leave-room");
const userRoute = require('./routes/route');
const blogRoute = require('./routes/blogRoutes');
const router = express.Router();

// cors
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://book-rack-root-frontend.onrender.com"],
  methods: ["GET", "POST","PUT"],
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://book-rack-root-frontend.onrender.com"],
    methods: ["GET", "POST"],
  },
});
// Reloader Function
const url = `https://book-rack-root-backend.onrender.com`;
const interval = 60 * 1000;

function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

//connecting Database
mongoose.connect(process.env.MY_MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// functions
app.get('/ping', (req, res) => {
  res.status(200).send('Ping received');
});

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

app.use('/api', userRoute);
app.use('/api', blogRoute);
app.use('/', router);

const CHAT_BOT = "ChatBot";
let allUsers = [];

// Socket.io events and message handling
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", async (data) => {
    const { username, room } = data;
    socket.join(room);

    allUsers.push({ id: socket.id, username, room });
    const chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    try {
      const foundItems = await Message.find({ room });
      socket.emit('lastMessages', foundItems);
    } catch (err) {
      console.error(err);
    }

    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat`,
      username: CHAT_BOT,
    });
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
    });
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);

    allUsers = leaveRoom(socket.id, allUsers);
    const chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.to(room).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
    });
    console.log(`${username} has left the chat`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from the chat");
    const user = allUsers.find((user) => user.id === socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      const chatRoomUsers = allUsers.filter((user) => user.room === user.room);
      socket.to(user.room).emit("chatroom_users", chatRoomUsers);
      socket.to(user.room).emit("receive_message", {
        message: `${user.username} has disconnected from the chat.`,
        username: CHAT_BOT,
      });
    }
  });

  socket.on("send_message", (data) => {
    const { message, username, room } = data;
    console.log(data);
    io.in(room).emit("receive_message", data);

    const newMessage = new Message({
      username,
      message,
      room,
    });

    newMessage.save()
      .then(doc => {
        console.log(doc._id.toString());
      })
      .catch(error => {
        console.error(error);
      });
  });
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");

  // Start the reloader function only after the server has started
  setInterval(reloadWebsite, interval);
});
