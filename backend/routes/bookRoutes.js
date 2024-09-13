const express = require('express');
const { addBook, getBooks, updateBookStatus } = require('../controllers/bookController');
const router = express.Router();

// Route to add a book
router.post('/add', addBook);

// Route to get all books for a user
router.get('/:username', getBooks);

// Route to update book status
router.post('/update', updateBookStatus);

module.exports = router;
