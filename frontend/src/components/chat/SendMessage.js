import './SendMessage.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SendMessage = ({ socket }) => {
  const { username, room } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      socket.emit('send_message', { username, room, message });
      setMessage('');
    }
  };

  return (
    <div className="sendMessageContainer">
      <input
        className="messageInput"
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') sendMessage();
        }}
        value={message}
      />
      <button className="sendButton" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default SendMessage;
