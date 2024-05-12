import React from 'react'
import './styles/Chat.css'
import MessagesReceived from './Messages';
import SendMessage from './SendMessage';
import RoomAndUsers from './room-and-users';

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