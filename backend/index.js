const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const router = express.Router();
const Message = require("./Message");
const FormData = require("./FormData");
const leaveRoom = require("./leave-room");
require('dotenv').config({path: './.env'});

mongoose.connect(process.env.MY_MONGO_URL, {
  useNewUrlParser: true,
});

const conn = mongoose.connection;
conn.on("connected", () => {
  console.log("Database connected successfully");
});
conn.on("disconnected", () => {
  console.log("Database disconnected successfully");
});
conn.on("error", console.error.bind(console, "Connection error:"));
module.exports = conn;

// Socket Handle
app.use("/", router);

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://book-rack-root-frontend.onrender.com",
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_ucd sers", chatRoomUsers);

    Message.find({ room: room })
    .then((foundItems) => {
        socket.emit('lastMessages', foundItems);
    })
    .catch((err) => {
      console.log(err);
    });

    let __createdtime__ = Date.now();
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat`,
      username: CHAT_BOT,
      __createdtime__,
    });
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });
  });
  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    const __createdtime__ = Date.now();
    // Remove user from memory
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit("chatroom_users", allUsers);
    socket.to(room).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    });
    console.log(`${username} has left the chat`);
  });
  socket.on("form_submit",(data)=>{
    const sendAway = new FormData({
      username: data.name,
      message: data.message,
      email:data.email,
    });
    sendAway.save().then(function (doc) {
      console.log(doc._id.toString());
    })
    .catch(function (error) {
      console.log(error);
    });
  })
  socket.on("disconnect", () => {
    console.log("User disconnected from the chat");
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit("chatroom_users", allUsers);
      socket.to(chatRoom).emit("receive_message", {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
  });
  socket.on("send_message", (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit("receive_message", data); // Send to all users in room, including sender

    const sendAway = new Message({
      username: username,
      message: message,
      room: room,
      time:__createdtime__,
    });
    sendAway
      .save()
      .then(function (doc) {
        console.log(doc._id.toString());
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});


server.listen(4000, () => "server listening on port 4000");
