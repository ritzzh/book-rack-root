import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Cards.css";
import { addBook } from "../features/user/userSlice"; // Import Redux action

const BookCards = ({ bookData }) => {
  const { title, authors, imageLinks } = bookData;
  const { username, baseURL } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddBook = (actionType) => {
    // Make a backend call to add the book to the user's "Read" or "Want to Read" list
    fetch(`${baseURL}/api/user/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        action: actionType,
        book: bookData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Dispatch Redux action to update state
          dispatch(addBook({ book: bookData, status: actionType }));
        } else {
          console.error("Failed to add book:", data.message);
        }
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  return (
    <div className="card-container">
      <img src={imageLinks?.thumbnail} alt={title} />
      <div className="card-title">{title}</div>
      <div className="card-author">{authors?.join(", ")}</div>
      <div className="card-actions">
        {/* Buttons to add book to either 'Read' or 'Want to Read' list */}
        <button onClick={() => handleAddBook("read")}>Add to Read</button>
        <button onClick={() => handleAddBook("want_to_read")}>Add to Want to Read</button>
      </div>
    </div>
  );
};

export default BookCards;
