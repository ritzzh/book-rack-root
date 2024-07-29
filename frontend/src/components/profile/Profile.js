import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../features/user/userSlice';
import './Profile.css';
import default_profile from '../assets/default_profile.png';
import { useEffect } from 'react';

const Profile = ({ baseURL, username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, logged } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${baseURL}/api/profile`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        dispatch(login({
          username,
          email: data.data.email,
          name: data.data.name,
          room: '' 
        }));
      }
    };

    if (username && !logged) {
      fetchProfile();
    }
  }, [baseURL, dispatch, username, logged]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="profile">
      <div className="pf-header">
        <div className="pf-left">
          <img src={default_profile} alt="Profile" />
        </div>
        <div className="pf-right">
          <div className="username">{username}</div>
          <div className="text">Name: {name}</div>
          <div className="text">Email: {email}</div>
        </div>
      </div>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
