import './RoomAndUsers.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRoom } from '../features/user/userSlice';

const RoomAndUsers = ({ socket }) => {
  const { username, room } = useSelector((state) => state.user);
  const [roomUsers, setRoomUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      setRoomUsers(data);
    });

    return () => {
      socket.off('chatroom_users');
    };
  }, [socket]);

  const leaveRoom = () => {
    socket.emit('leave_room', { username, room });
    dispatch(setRoom({ room: '' }));
    localStorage.removeItem('messages');
    navigate('/ChatBox');
  };

  return (
    <div className="roomAndUsersContainer">
      <h2 className="roomTitle">{room}</h2>
      <div className='userList-display'>
        {roomUsers.length > 0 && <h5 className="usersTitle">Users:</h5>}
        <ul className="usersList">
          {roomUsers.map((user) => (
            <li
              className={`user ${user.username === username ? 'selfUser' : ''}`}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <button className="btn leaveBtn" onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;
