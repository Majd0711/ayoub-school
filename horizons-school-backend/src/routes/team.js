const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const { protect, authorize } = require('../middleware/auth');
const {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/teamController');

router.route('/')
  .get(getTeamMembers)
  .post(
    protect,
    authorize('super-admin'),
    upload.single('image'),
    createTeamMember
  );

router.route('/:id')
  .get(getTeamMember)
  .put(
    protect,
    authorize('super-admin'),
    upload.single('image'),
    updateTeamMember
  )
  .delete(protect, authorize('super-admin'), deleteTeamMember);

module.exports = router; 