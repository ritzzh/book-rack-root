const express =  require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
const mongoose = require('mongoose');
const { Timestamp } = require('mongodb');
const Message = require('./Message');

mongoose.connect('mongodb+srv://ritesh:root@cluster0.tztqqkf.mongodb.net/',{
    useNewUrlParser: true,
})

const conn = mongoose.connection;
conn.on('connected', () => {
    console.log('Database connected successfully');
});
conn.on('disconnected', () => {
    console.log('Database disconnected successfully');
});
conn.on('error', console.error.bind(console, 'Connection error:'));
module.exports = conn;


// Socket Handle

app.use(cors());
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: 'http://localhost:3000',
        methods:['GET','POST'],
    }
})

const CHAT_BOT ='ChatBot';
let chatRoom = '';
let allUsers = [];

io.on('connection', (socket)=>{
    console.log(`user connected ${socket.id}`);

    socket.on('join_room',(data)=>{
        const {username,room} = data;
        socket.join(room);

        chatRoom = room;
        allUsers.push({id:socket.id,username,room});
        chatRoomUsers = allUsers.filter((user)=>user.room===room);
        socket.to(room).emit('chatroom_users',chatRoomUsers);
        socket.emit('chatroom_users',chatRoomUsers);

        let __createdtime__ = Date.now();
        socket.to(room).emit('receive_message',{
            message: `${username} has joined the chat`,
            username :CHAT_BOT,
            __createdtime__,
        });
        socket.emit('receive_message', {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            __createdtime__,
          });
    });
    socket.on('send_message', (data) => {
        const { message, username, room, __createdtime__ } = data;
        io.in(room).emit('receive_message', data); // Send to all users in room, including sender
        

        const text = new Message({ user: username, text: message, room : room });
        message.save((err) => {
            if (err) {
              console.error('Error saving message to database:', err);
            } else {
              console.log('Message saved to the database');
            }
          });
      });
});


server.listen(4000,()=>
'server listening on port 4000');