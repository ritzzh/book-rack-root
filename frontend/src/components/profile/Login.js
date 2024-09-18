import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/user/userSlice';
import './Login.css';

function Login({ baseURL }) {
  const [pass, setPass] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUerror] = useState('');
  const [passError, setPerror] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch(`${baseURL}/api/user/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.success) {
      dispatch(login({
        username,
        email: data.data.email,
        institute: data.data.institute,
        name: data.data.name,
        logged: true,
        baseURL:baseURL
      }));
      navigate('/Profile');
    } else {
      if (data.message === 'Invalid-U') {
        setUerror('* user does not exist');
      }
      if (data.message === 'Invalid-P') {
        setPerror('* wrong Password, Try Again');
      }
    }
  };

  const handleSignUp = () => {
    navigate('/SignUp');
  };

  return (
    <div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="error-pop">{userError}</div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={pass ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              id="check"
              type="checkbox"
              value={pass}
              onChange={() => setPass((prev) => !prev)}
            />
            <div className="error-pop">{passError}</div>
          </div>
          <div className="form-buttons">
            <button type="submit" className="act-button">Login</button>
            <button type="button" className="act-button" onClick={handleSignUp}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
