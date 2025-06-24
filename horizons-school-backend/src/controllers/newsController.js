const News = require('../models/News');

// @desc    Get all news and events
// @route   GET /api/v1/news
// @access  Public
exports.getNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = News.find();

    // Filter by type
    if (req.query.type) {
      query = query.where('type').equals(req.query.type);
    }

    // Filter by active status
    if (req.query.isActive) {
      query = query.where('isActive').equals(req.query.isActive === 'true');
    }

    // Search by title
    if (req.query.search) {
      query = query.where('title', new RegExp(req.query.search, 'i'));
    }

    // Filter by date range for events
    if (req.query.startDate && req.query.endDate) {
      query = query.where('eventDate').gte(req.query.startDate).lte(req.query.endDate);
    }

    // Execute query with pagination
    const total = await News.countDocuments(query);
    const news = await query
      .populate('createdBy', 'username')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: news.length,
      pagination: {
        page,
        limit,
        total
      },
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

// @desc    Create news/event
// @route   POST /api/v1/news
// @access  Private
exports.createNews = async (req, res) => {
  try {
    req.body.createdBy = req.admin.id;
    
    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    const news = await News.create(req.body);

    res.status(201).json({
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

// @desc    Update news/event
// @route   PUT /api/v1/news/:id
// @access  Private
exports.updateNews = async (req, res) => {
  try {
    let news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    // Check ownership
    if (news.createdBy.toString() !== req.admin.id && req.admin.role !== 'super-admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this news/event'
      });
    }

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

    // Check ownership
    if (news.createdBy.toString() !== req.admin.id && req.admin.role !== 'super-admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this news/event'
      });
    }

    await news.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}; 