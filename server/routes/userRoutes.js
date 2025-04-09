const express = require('express');
const { check } = require('express-validator');
const {
  getUserByUsername,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Route to fetch a user by username
router.get('/:username', getUserByUsername);

// Route to fetch all users
router.get('/', getAllUsers);

// Route to update a user's complete data (admin or internal use)
router.patch(
  '/:username/:field', updateUser
);

// Route to delete a user
router.delete('/:username', deleteUser);

module.exports = router;
