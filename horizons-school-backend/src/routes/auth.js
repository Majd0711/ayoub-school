const express = require('express');
const router = express.Router();
const { register, login, getMe, getProfile, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Auth routes
router.post('/register', protect, register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logout);

module.exports = router; 