const Program = require('../models/Program');

// @desc    Get all programs
// @route   GET /api/v1/programs
// @access  Public
exports.getPrograms = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Build query
    let query = Program.find();

    // Filter by category
    if (req.query.category) {
      // Handle both uppercase and lowercase category names
      const categoryRegex = new RegExp('^' + req.query.category + '$', 'i');
      query = query.where('category').regex(categoryRegex);
    }

    // Filter by level
    if (req.query.level) {
      query = query.where('level').equals(req.query.level);
    }

    // Filter by active status
    if (req.query.isActive) {
      query = query.where('isActive').equals(req.query.isActive === 'true');
    }

    // Filter by featured status
    if (req.query.isFeatured) {
      query = query.where('isFeatured').equals(req.query.isFeatured === 'true');
    }

    // Search by title
    if (req.query.search) {
      query = query.where('title', new RegExp(req.query.search, 'i'));
    }

    // Execute query with pagination
    const total = await Program.countDocuments(query);
    const programs = await query
      .populate('createdBy', 'username')
      .sort('-createdAt')
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

    res.status(200).json({
      success: true,
      count: programs.length,
      pagination,
      total,
      data: programs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single program
// @route   GET /api/v1/programs/:id
// @access  Public
exports.getProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate('createdBy', 'username');

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    res.status(200).json({
      success: true,
      data: program
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create program
// @route   POST /api/v1/programs
// @access  Private
exports.createProgram = async (req, res) => {
  try {
    req.body.createdBy = req.admin.id;
    
    // Handle image upload
    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    // Handle features as array
    if (req.body.features && typeof req.body.features === 'string') {
      req.body.features = req.body.features.split(',').map(feature => feature.trim());
    }
    
    const program = await Program.create(req.body);

    res.status(201).json({
      success: true,
      data: program
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update program
// @route   PUT /api/v1/programs/:id
// @access  Private
exports.updateProgram = async (req, res) => {
  try {
    let program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    // Make sure user is program owner or super-admin
    if (program.createdBy.toString() !== req.admin.id && req.admin.role !== 'super-admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this program'
      });
    }

    // Handle image upload
    if (req.file) {
      req.body.image = req.file.filename;
    }

    // Handle features as array
    if (req.body.features && typeof req.body.features === 'string') {
      req.body.features = req.body.features.split(',').map(feature => feature.trim());
    }

    program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: program
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete program
// @route   DELETE /api/v1/programs/:id
// @access  Private
exports.deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    // Make sure user is program owner or super-admin
    if (program.createdBy.toString() !== req.admin.id && req.admin.role !== 'super-admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this program'
      });
    }

    await program.deleteOne();

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

// @desc    Get featured programs
// @route   GET /api/v1/programs/featured
// @access  Public
exports.getFeaturedPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true, isFeatured: true })
      .sort('-createdAt')
      .limit(4)
      .select('title description image category level duration');

    res.status(200).json({
      success: true,
      count: programs.length,
      data: programs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}; 