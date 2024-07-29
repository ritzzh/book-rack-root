import React, { useState } from 'react';
import '../styles/ChatBox.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../features/user/userSlice';

function ChatBox({ socket }) {
  const [room, setRoomState] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useSelector(state => state.user);

  const joinRoom = () => {
    if (room === '' || room === '-- Select Discussion') {
      alert('Please select a room to join.');
      return;
    }

    dispatch(setRoom({ room }));

    if (username !== '') {
      socket.emit('join_room', { username, room });
      navigate('/chat');
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <div className="chatbox-groupname">
          Book Discussion Room
        </div>
        <div className="chatbox-select room">
          <select className='input'
            name="Select Discussion"
            onChange={(e) => setRoomState(e.target.value)}>
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
