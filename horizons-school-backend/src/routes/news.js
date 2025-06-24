const express = require('express');
const router = express.Router();
const upload = require('../utils/fileUpload');
const { protect, authorize } = require('../middleware/auth');
const {
  getNews,
  getSingleNews,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/newsController');

router.route('/')
  .get(getNews)
  .post(
    protect,
    authorize('admin', 'super-admin'),
    upload.single('image'),
    createNews
  );

router.route('/:id')
  .get(getSingleNews)
  .put(
    protect,
    authorize('admin', 'super-admin'),
    upload.single('image'),
    updateNews
  )
  .delete(protect, authorize('admin', 'super-admin'), deleteNews);

module.exports = router; 