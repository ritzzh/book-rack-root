const express = require('express')
const router = express.Router();
const UserControl = require('../controllers/UserController');


router.post('/login',UserControl.login);
router.post('/signup',UserControl.signup);
router.post('/profile',UserControl.profile);

module.exports = router;