const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const { protect, authorize } = require('../middleware/auth');
const {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner
} = require('../controllers/partnerController');

router.route('/')
  .get(getPartners)
  .post(
    protect,
    authorize('admin', 'super-admin'),
    upload.single('image'),
    createPartner
  );

router.route('/:id')
  .get(getPartner)
  .put(
    protect,
    authorize('admin', 'super-admin'),
    upload.single('image'),
    updatePartner
  )
  .delete(protect, authorize('admin', 'super-admin'), deletePartner);

module.exports = router; 