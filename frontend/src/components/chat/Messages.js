import '../styles/Chat.css'
import React, { useRef, useEffect, useState } from 'react'

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([])

  const messagesColumnRef = useRef(null);

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
          <div className="message" key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="msgMeta">{msg.username}</span>
            </div>
            <p className="msgText">{msg.message}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages;
