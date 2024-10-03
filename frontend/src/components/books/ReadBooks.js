import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookCards from "./BookCards"; // Import BookCards component

const ReadBooks = () => {
  const [readBooks, setReadBooks] = useState([]);
  const { username, baseURL } = useSelector((state) => state.user);

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
          throw new Error("Failed to fetch books.");
        }

        const data = await response.json();
        if (data.success) {
          const filteredBooks = data.books.filter((book) => book.status === "read");
          if (filteredBooks.length === 0) {
            setError("No books marked as 'Read' yet.");
          } else {
            setReadBooks(filteredBooks);
          }
        } else {
          setError("Failed to fetch books. Please try again.");
        }
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
      {readBooks.length === 0 ? (
        <p>No books marked as "Read" yet.</p>
      ) : (
        <div className="read-books">
          {readBooks.map((book) => (
            <BookCards key={book._id} bookData={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadBooks;
