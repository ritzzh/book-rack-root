import React from 'react'
import './styles/Chat.css'
import MessagesReceived from './Messages';
import SendMessage from './SendMessage';

function Chat({username, room, socket}) {
  return (
    <div className="chatContainer">
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  )
}

export default Chat;