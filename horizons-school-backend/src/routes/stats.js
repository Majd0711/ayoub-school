const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAllStats,
  getProgramStats,
  getNewsStats,
  getContactStats,
  getTeamStats
} = require('../controllers/statsController');

// Get all stats
router.get('/', protect, getAllStats);

// Get individual stats
router.get('/programs', protect, getProgramStats);
router.get('/news', protect, getNewsStats);
router.get('/contacts', protect, getContactStats);
router.get('/team', protect, getTeamStats);

module.exports = router; 