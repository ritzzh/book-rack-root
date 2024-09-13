const Book = require('../models/Book');
const User = require('../models/User');

// Controller to add a book for a user
const addBook = async (req, res) => {
  const { username, book, action } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    console.log(user)
    const newBook = new Book({
      title: book.title,
      authors: book.authors,
      thumbnail: book.imageLinks.thumbnail,
      status: action,
      user: user._id,
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error: error.message });
  }
};

// Controller to get all books for a user
const getBooks = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find books by user ID
    const books = await Book.find({ user: user._id });

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

// Controller to update the status of a book
const updateBookStatus = async (req, res) => {
  const { username, book, status } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update the book's status
    const updatedBook = await Book.findOneAndUpdate(
      { _id: book._id, user: user._id },
      { status },
      { new: true }
    );

    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book status updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book status', error: error.message });
  }
};

module.exports = { addBook, getBooks, updateBookStatus };
