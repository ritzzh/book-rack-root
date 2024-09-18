const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ type: String }],
  thumbnail: { type: String },
  status: { type: String, enum: ['read', 'toBeRead'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
