const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

router.route('/')
  .get(protect, authorize('admin', 'super-admin'), getContacts)
  .post(createContact);

router.route('/:id')
  .get(protect, authorize('admin', 'super-admin'), getContact)
  .put(protect, authorize('admin', 'super-admin'), updateContact)
  .delete(protect, authorize('super-admin'), deleteContact);

module.exports = router; 