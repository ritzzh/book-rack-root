const express = require('express');
const { getBooks, setBooks } = require('../controllers/bookController');
const router = express.Router();

// Route to add a book
router.post('/setbooks', setBooks);

// Route to get all books for a user
router.post('/getbooks', getBooks);


module.exports = router;
