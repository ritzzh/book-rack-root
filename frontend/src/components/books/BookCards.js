import React from "react";
import {useSelector } from "react-redux";
import "./Cards.css";

const BookCards = ({ bookData }) => {
  const { title, authors, imageLinks, thumbnail } = bookData;
  const { username, baseURL } = useSelector((state) => state.user);
  
  const handleAddBook = async (actionType) => {
    console.log(username,baseURL,actionType)
    const response = await fetch(`${baseURL}/api/book/setbooks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        action: actionType,
        book: bookData,
      }),
    });
    const data = await response.json();
  };

  return (
    <div className="card-container">
      <img src={imageLinks?.thumbnail || thumbnail} alt={title} />
      <div className="card-title">{title}</div>
      <div className="card-author">{authors?.join(", ")}</div>
      <div className="card-actions">
        <button onClick={() => handleAddBook("read")}>Read</button>
        <button onClick={() => handleAddBook("toBeRead")}>To be Read</button>
      </div>
    </div>
  );
};

export default BookCards;
