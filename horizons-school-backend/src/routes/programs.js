const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const { protect, authorize } = require('../middleware/auth');
const { validateProgram } = require('../middleware/validate');
const {
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
  getFeaturedPrograms
} = require('../controllers/programController');

// Featured programs route should come before /:id route to avoid conflict
router.get('/featured', getFeaturedPrograms);

router.route('/')
  .get(getPrograms)
  .post(
    protect, 
    authorize('admin', 'super-admin'), 
    upload.single('image'),
    validateProgram,
    createProgram
  );

router.route('/:id')
  .get(getProgram)
  .put(
    protect, 
    authorize('admin', 'super-admin'), 
    upload.single('image'),
    validateProgram,
    updateProgram
  )
  .delete(protect, authorize('admin', 'super-admin'), deleteProgram);

module.exports = router; 