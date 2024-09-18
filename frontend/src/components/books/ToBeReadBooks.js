import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookCards from "./BookCards";

const ToBeReadBooks = () => {
  const { username, baseURL } = useSelector((state) => state.user);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const refreshPage= () => {
  //   window.location.reload();
  // }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${baseURL}/api/book/getbooks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        console.log(data)
        const filteredBooks = data.books.filter(
          (book) => book.status !== "read"
        );
        setWantToReadBooks(filteredBooks);
        
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("An error occurred while fetching the books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [username, baseURL]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>To Be Read Books</h2>
      <div className="tbr-books">
        {wantToReadBooks.length === 0 ? (
          <p>No books in 'To Be Read' list.</p>
        ) : (
          wantToReadBooks.map((book) => (
            <BookCards key={book._id} bookData={book}>
            </BookCards>
          ))
        )}
      </div>
    </div>
  );
};

export default ToBeReadBooks;
