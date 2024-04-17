import './styles/Chat.css'
import React, { useEffect, useState } from 'react'

const Messages=({socket}) =>{
    const [messagesRecieved, setMessagesReceived] = useState([]);
  
    useEffect(() => {
        socket.on('receive_message', (data) => {
          console.log(data);
          setMessagesReceived((state) => [
            ...state,
            {
              message: data.message,
              username: data.username,
              __createdtime__: data.__createdtime__,
            },
          ]);
        });
        return () => socket.off('receive_message');
        }, [socket]);
        
        function formatDateFromTimestamp(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleString();
        }
    return (
    <div>
        <div className="messagesColumn">
      {messagesRecieved.map((msg, i) => (
        <div className="message" key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="msgMeta">{msg.username}</span>
            <span className="msgMeta">
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
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