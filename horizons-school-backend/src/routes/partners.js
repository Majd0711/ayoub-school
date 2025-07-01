const express = require('express');
const router = express.Router();
const { 
  getPartners, 
  getPartner, 
  createPartner, 
  updatePartner, 
  deletePartner 
} = require('../controllers/partnerController');
const { protect } = require('../middleware/auth');
const { uploadProgramImage } = require('../utils/fileUpload');

// Public routes
router.get('/', getPartners);
router.get('/:id', getPartner);

// Protected routes
router.post('/', protect, uploadProgramImage, createPartner);
router.put('/:id', protect, uploadProgramImage, updatePartner);
router.delete('/:id', protect, deletePartner);

module.exports = router; 