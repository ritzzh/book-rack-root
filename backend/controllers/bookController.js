const Book = require('../models/Book');
const User = require('../models/User');

const setBooks = async (req, res) => {
  const { username, book, action } = req.body;

  if (!username || !book || !action) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const existingBook = await Book.findOne({ title: book.title, user: user._id });

    if (existingBook) {
      existingBook.status = action;
      await existingBook.save();

      return res.status(200).json({ 
        success: true, 
        message: 'Book status updated successfully', 
        book: existingBook 
      });
    } else {
      // If the book does not exist, create a new book
      const newBook = new Book({
        title: book.title,
        authors: book.authors,
        thumbnail: book.imageLinks.thumbnail,
        status: action,
        user: user._id,
      });

      await newBook.save();
      return res.status(201).json({ 
        success: true, 
        message: 'Book added successfully', 
        book: newBook 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding or updating book', error: error.message });
  }
};

const getBooks = async (req, res) => {
  console.log(req.body)
  const { username } = req.body;
  console.log(username)
  if (!username) {
    return res.status(400).json({ success: false, message: 'Missing required parameter: username' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const books = await Book.find({ user: user._id });
    console.log(books)

    res.status(200).json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching books', error: error.message });
  }
};

module.exports = { setBooks, getBooks };
