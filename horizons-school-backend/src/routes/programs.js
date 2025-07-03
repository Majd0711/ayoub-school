const express = require('express');
const router = express.Router();
const { 
  getPrograms, 
  getProgram, 
  createProgram, 
  updateProgram, 
  deleteProgram,
  getHomePrograms,
  toggleHomeVisibility,
  reorderPrograms
} = require('../controllers/programController');
const { protect } = require('../middleware/auth');
const { uploadProgramImage } = require('../utils/fileUpload');

// Public routes
router.get('/', getPrograms);
router.get('/home', getHomePrograms);
router.get('/:id', getProgram);

// Protected routes
router.use(protect);
router.post('/', uploadProgramImage, createProgram);
router.put('/:id', uploadProgramImage, updateProgram);
router.delete('/:id', deleteProgram);
router.put('/:id/toggle-home', toggleHomeVisibility);
router.post('/reorder', reorderPrograms);

module.exports = router; 