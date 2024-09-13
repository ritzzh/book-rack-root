import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import "./Profile.css";
import default_profile from "../assets/default_profile.png";

const Profile = ({ baseURL, username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, logged } = useSelector((state) => state.user);
  const [booksRead, setBooksRead] = useState([]);
  const [booksToRead, setBooksToRead] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${baseURL}/api/profile`, {
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
        setBooksRead(data.data.booksRead);
        setBooksToRead(data.data.booksToRead);
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

  const handleBookStatusChange = (book, status) => {
    // Update backend and change state
    fetch(`${baseURL}/api/user/updateBookStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, book, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (status === "read") {
          setBooksRead([...booksRead, book]);
          setBooksToRead(booksToRead.filter((b) => b.id !== book.id));
        } else {
          setBooksToRead([...booksToRead, book]);
          setBooksRead(booksRead.filter((b) => b.id !== book.id));
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="profile">
      <div className="pf-top">
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
      <div className="pf-bottom">
        <div className="books-section">
          <h3>Read Books</h3>
          <div className="book-list">
            {booksRead.map((book) => (
              <div key={book.id}>
                <div className="book-card">{book.title}</div>
                {/* Button to move from 'Read' to 'Want to Read' */}
                <button onClick={() => handleBookStatusChange(book, "want_to_read")}>
                  Move to Want to Read
                </button>
              </div>
            ))}
          </div>
          <h3>Want to Read Books</h3>
          <div className="book-list">
            {booksToRead.map((book) => (
              <div key={book.id}>
                <div className="book-card">{book.title}</div>
                {/* Button to move from 'Want to Read' to 'Read' */}
                <button onClick={() => handleBookStatusChange(book, "read")}>
                  Move to Read
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
