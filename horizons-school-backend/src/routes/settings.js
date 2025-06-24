const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getSettings,
  getSetting,
  updateSetting,
  initializeSettings
} = require('../controllers/settingsController');

router.route('/')
  .get(getSettings);

router.route('/init')
  .post(protect, authorize('super-admin'), initializeSettings);

router.route('/:key')
  .get(getSetting)
  .put(protect, authorize('super-admin'), updateSetting);

module.exports = router; 