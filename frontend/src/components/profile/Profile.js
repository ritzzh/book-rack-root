import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import "./Profile.css";
import default_profile from "../assets/default_profile.png";
import ReadBooks from "../books/ReadBooks";
import ToBeReadBooks from "../books/ToBeReadBooks";

const Profile = ({ baseURL, username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, logged } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${baseURL}/api/user/profile`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (data.success) {
        dispatch(
          login({
            username,
            email: data.data.email,
            name: data.data.name,
            room: "",
          })
        );
      }
    };

    if (username && !logged) {
      fetchProfile();
    }
  }, [baseURL, dispatch, username, logged]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <div className="profile-outer">
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
      <div className="profile-books">
        <div className="books-section">
          <div className="read">
            <h2>Read Books</h2>
            <ReadBooks></ReadBooks>
          </div>
          <div className="tbr">
          <h2>To be Read </h2>
            <ToBeReadBooks></ToBeReadBooks>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
