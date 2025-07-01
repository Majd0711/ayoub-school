const express = require('express');
const router = express.Router();
const { 
  getNews, 
  getSingleNews, 
  createNews, 
  updateNews, 
  deleteNews,
  getFeaturedNews,
  getNewsByType,
  toggleFeatured,
  toggleActive
} = require('../controllers/newsController');
const { protect, authorize } = require('../middleware/auth');
const { uploadNewsImage } = require('../utils/fileUpload');

// Public routes
router.get('/', getNews);
router.get('/featured', getFeaturedNews);
router.get('/type/:type', getNewsByType);
router.get('/:id', getSingleNews);

// For development/testing, allow creating news without authentication
if (process.env.NODE_ENV === 'development') {
  router.post('/', uploadNewsImage, createNews);
} else {
  // Protected routes in production
  router.post('/', protect, authorize('admin', 'super-admin'), uploadNewsImage, createNews);
}

// Other protected routes
router.use(protect);
router.use(authorize('admin', 'super-admin'));

router.put('/:id', uploadNewsImage, updateNews);
router.put('/:id/featured', toggleFeatured);
router.put('/:id/active', toggleActive);
router.delete('/:id', deleteNews);

module.exports = router; 