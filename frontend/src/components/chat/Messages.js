import '../styles/Chat.css'
import React, { useRef,useEffect, useState } from 'react'

const Messages=({socket}) =>{
    const [messagesRecieved, setMessagesReceived] = useState([]);
  
    const messagesColumnRef = useRef(null);
    useEffect(() => {
      // Last 100 messages sent in the chat room (fetched from the db in backend)
      socket.on('lastMessages', (lastMessages) => {
        console.log('Last  messages:', lastMessages);
        //lastMessages = JSON.parse(lastMessages);
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
        <div className="messagesColumn" ref={messagesColumnRef}>
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