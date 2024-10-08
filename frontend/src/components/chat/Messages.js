import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Messages.css';

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const messagesColumnRef = useRef(null);
  const { username } = useSelector(state => state.user);

  useEffect(() => {
    socket.on('lastMessages', (lastMessages) => {
      setMessagesReceived((state) => [...lastMessages, ...state]);
    });

    return () => socket.off('lastMessages');
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
        },
      ]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messagesRecieved));
  }, [messagesRecieved]);

  return (
    <div>
      <div className="messagesColumn" ref={messagesColumnRef}>
        {messagesRecieved.map((msg, i) => (
          <div
            className={msg.username === username ? 'myMessage' : 'genMessage'}
            key={i}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: msg.username === username ? 'flex-end' : 'flex-start',
              }}
            >
              <span className="msgMeta">{msg.username}</span>
            </div>
            <p className="msgText">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
