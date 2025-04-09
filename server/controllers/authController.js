const User = require('../models/User');
const { Mood } = require('../models/Mood');
const { generateToken } = require('../utils/tokenUtils');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    username,
    name,
    email,
    password,
    partner,
    adminCode,
    age,
    gender,
    chomulation,
  } = req.body;

  try {
    // Check if username or email already exists
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUsername || existingEmail) {
      return res.status(400).json({ message: 'Username or Email already in use' });
    }

    const isAdmin = adminCode === '1834R&J';

    // Create a new user
    const user = new User({
      username,
      name,
      email,
      password,
      partner: partner || null,
      isAdmin,
      age: age || null,
      gender: gender || 'prefer not to say',
      chomulation: chomulation || null,
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);
    const user = await User.findOne(isEmail ? { email: usernameOrEmail } : { username: usernameOrEmail });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
