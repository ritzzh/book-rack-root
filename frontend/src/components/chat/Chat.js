import React from 'react'
import '../styles/Chat.css'
import MessagesReceived from '../chat/Messages';
import SendMessage from '../chat/SendMessage';
import RoomAndUsers from '../chat/room-and-users';

function Chat({username, room, socket}) {
  return (
    <div className="chatContainer">
    <RoomAndUsers socket={socket} username={username} room={room}/>
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  )
}

export default Chat;