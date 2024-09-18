import React, { useState } from "react";
import Card from "./BookCards";
import search_icon from "../assets/search.png";
import "./BookSearch.css";

const BookSearch = () => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);
  const api_key = process.env.REACT_APP_API_KEY;

  const searchAPI = async () => {
    const bookInput = document.querySelector(".bookinput").value.trim();
    if (bookInput === "") return;

    setLoading(true); // Start loading
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookInput}&key=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setItemData(data.items.slice(0, 4)); // Get top 4 results
    } catch (error) {
      alert("An error occurred while fetching data. Please retry.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="main">
      <div className="top-bar">
        <input
          type="text"
          className="bookinput"
          placeholder="Search for books..."
          onKeyDown={(e) => {
            if (e.key === "Enter") searchAPI();
          }}
        />
        <div className="src-icon" onClick={searchAPI}>
          <img className="inputsearch" src={search_icon} alt="search" />
        </div>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="outer-container">
          {itemData.map((item) => (
            <Card
              key={item.id}
              bookData={item.volumeInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
