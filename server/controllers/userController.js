const User = require('../models/User');
const { Mood } = require('../models/Mood');
const { validationResult } = require('express-validator');
const { getElapsedTime } = require('../helper/DateHelper');

// Fetch a user by username
exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const moodData = await Mood.findOne({ username });
    res.status(200).json({
      user,
      currentMood: moodData?.currentMood || null,
      moodHistory: moodData?.moodHistory || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a user's profile
exports.updateUser = async (req, res) => {
  const { username } = req.params;

  try {
    const updates = req.body; // Only the updated fields

    const user = await User.findOneAndUpdate({ username }, updates, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Delete a user
exports.deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndDelete({ username });
    const moodData = await Mood.findOneAndDelete({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user, moodData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
