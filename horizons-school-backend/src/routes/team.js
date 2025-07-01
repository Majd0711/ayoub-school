const express = require('express');
const router = express.Router();
const { 
  getTeamMembers, 
  getTeamMember, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
} = require('../controllers/teamController');
const { protect } = require('../middleware/auth');
const { uploadTeamMemberImage } = require('../utils/fileUpload');

// Public routes
router.get('/', getTeamMembers);
router.get('/:id', getTeamMember);

// Protected routes
router.post('/', protect, uploadTeamMemberImage, createTeamMember);
router.put('/:id', protect, uploadTeamMemberImage, updateTeamMember);
router.delete('/:id', protect, deleteTeamMember);

module.exports = router; 