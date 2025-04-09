const express = require("express");
const { check } = require("express-validator");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required and must be alphanumeric').isAlphanumeric(),
    check('name', 'Name is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('partnerCode', 'Partner code must be alphanumeric').optional().isAlphanumeric(),
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

module.exports = router;
