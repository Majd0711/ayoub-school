const News = require('../models/News');
const slugify = require('slugify');

// @desc    Get all news/events with filtering and pagination
// @route   GET /api/v1/news
// @access  Public
exports.getNews = async (req, res) => {
  try {
    // Build query with pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    // Build query
    let query = News.find();
    
    // Filter by type - default to only news and event (exclude workshop)
    if (req.query.type) {
      query = query.where('type').equals(req.query.type);
    } else {
      // By default, exclude workshop type unless all types are explicitly requested
      if (!req.query.includeAll) {
        query = query.where('type').in(['news', 'event']);
      }
    }
    
    // Filter by category
    if (req.query.category) {
      query = query.where('category').equals(req.query.category);
    }
    
    // Filter by featured
    if (req.query.featured) {
      query = query.where('isFeatured').equals(req.query.featured === 'true');
    }
    
    // Filter by active status
    if (req.query.active) {
      query = query.where('isActive').equals(req.query.active === 'true');
    }
    
    // Filter by tags
    if (req.query.tag) {
      query = query.where('tags').in([req.query.tag]);
    }
    
    // Search by title or content
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = query.or([
        { title: searchRegex },
        { content: searchRegex }
      ]);
    }
    
    // Sort by date (default: newest first)
    const sortBy = req.query.sort || '-createdAt';
    query = query.sort(sortBy);
    
    // Count total documents
    const total = await News.countDocuments(query);
    
    // Execute query with pagination
    const news = await query
      .populate('createdBy', 'username')
      .skip(startIndex)
      .limit(limit);
      
    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    pagination.total = total;
    pagination.pages = Math.ceil(total / limit);
    pagination.current = page;
    
    res.status(200).json({
      success: true,
      count: news.length,
      pagination,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get featured news/events
// @route   GET /api/v1/news/featured
// @access  Public
exports.getFeaturedNews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 3;
    
    const featured = await News.find({ 
      isFeatured: true, 
      isActive: true,
      type: { $in: ['news', 'event'] } // Exclude workshop type
    })
    .sort('-createdAt')
    .limit(limit);
    
    res.status(200).json({
      success: true,
      count: featured.length,
      data: featured
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get news/events by type
// @route   GET /api/v1/news/type/:type
// @access  Public
exports.getNewsByType = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    
    const news = await News.find({ 
      type: req.params.type, 
      isActive: true 
    })
    .sort('-createdAt')
    .limit(limit);
    
    res.status(200).json({
      success: true,
      count: news.length,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single news/event
// @route   GET /api/v1/news/:id
// @access  Public
exports.getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('createdBy', 'username');
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new news/event
// @route   POST /api/v1/news
// @access  Private
exports.createNews = async (req, res) => {
  try {
    console.log('Creating news with data:', req.body);
    console.log('File uploaded:', req.file);
    
    // Handle boolean values
    if (typeof req.body.isActive === 'string') {
      req.body.isActive = req.body.isActive === 'true';
    }
    
    if (typeof req.body.isFeatured === 'string') {
      req.body.isFeatured = req.body.isFeatured === 'true';
    }
    
    // Handle tags array
    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    }
    
    // Create slug from title
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }
    
    // Add image if uploaded
    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    // Ensure type is set
    if (!req.body.type) {
      req.body.type = 'news';
    }
    
    // Create the news item without requiring createdBy
    const news = await News.create(req.body);
    
    res.status(201).json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update news/event
// @route   PUT /api/v1/news/:id
// @access  Private
exports.updateNews = async (req, res) => {
  try {
    console.log('Updating news with ID:', req.params.id);
    console.log('Update data:', req.body);
    console.log('File uploaded:', req.file);
    console.log('User:', req.user);
    
    let news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }
    
    // Check ownership if not super-admin
    if (req.user && req.user.role !== 'super-admin' && 
        news.createdBy && news.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this news/event'
      });
    }
    
    // Handle boolean values
    if (typeof req.body.isActive === 'string') {
      req.body.isActive = req.body.isActive === 'true';
    }
    
    if (typeof req.body.isFeatured === 'string') {
      req.body.isFeatured = req.body.isFeatured === 'true';
    }
    
    // Handle tags array
    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    }
    
    // Update slug if title changed
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }
    
    // Update image if new one uploaded
    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Toggle featured status
// @route   PUT /api/v1/news/:id/featured
// @access  Private
exports.toggleFeatured = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }
    
    // Toggle featured status
    news.isFeatured = !news.isFeatured;
    await news.save();
    
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Toggle active status
// @route   PUT /api/v1/news/:id/active
// @access  Private
exports.toggleActive = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }
    
    // Toggle active status
    news.isActive = !news.isActive;
    await news.save();
    
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('Error toggling active status:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete news/event
// @route   DELETE /api/v1/news/:id
// @access  Private
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    // Check ownership if not super-admin
    if (req.user && req.user.role !== 'super-admin' && 
        news.createdBy && news.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this news/event'
      });
    }

    await news.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};