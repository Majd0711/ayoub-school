const express = require('express');
const router = express.Router();
const { 
  getPrograms, 
  getProgram, 
  createProgram, 
  updateProgram, 
  deleteProgram 
} = require('../controllers/programController');
const { protect } = require('../middleware/auth');
const { uploadProgramImage } = require('../utils/fileUpload');

// Public routes
router.get('/', getPrograms);
router.get('/:id', getProgram);

// Protected routes
router.post('/', protect, uploadProgramImage, createProgram);
router.put('/:id', protect, uploadProgramImage, updateProgram);
router.delete('/:id', protect, deleteProgram);

module.exports = router; 