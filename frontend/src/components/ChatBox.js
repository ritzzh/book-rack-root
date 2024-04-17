import React from 'react'
import './styles/ChatBox.css'
import { useNavigate } from 'react-router-dom'


function ChatBox({username, setUsername, room, setRoom, socket}) {
  const navigate = useNavigate();
  
  const joinRoom = () =>{
    if(room!=='' && username!== ' '){
      socket.emit('join_room',{username,room})
    }
    navigate('/chat', { replace: true });
  }
 
 
  return (
    <div className="container">
      <div className="formContainer">
        <div className="chatbox-groupname">
            Book Discussion Room
        </div>
        <div className="chatbox-user">
            <input className='input'
            type="text" 
            placeholder='username'
            onChange={(e)=>setUsername(e.target.value)}
            />
        </div>
        <div className="chatbox-select room">
          <select className='input'
            name="Select Discussion"
            onChange={(e)=>setRoom(e.target.value)}>
            <option>-- Select Discussion</option>
            <option value="currentread">Current Read</option>
            <option value="latestrelease">Latest Release</option>
            <option value="authorsection">Author Section</option>
            <option value="lounge">Lounge</option>
          </select>
        </div>
        <div className="chatbox-submit">
          <button className='btn btn-secondary'
            onClick={joinRoom}>
            Join Room
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox