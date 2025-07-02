const Program = require('../models/Program');

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort('displayOrder');
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

// @desc    Get home page programs
// @route   GET /api/programs/home
// @access  Public
exports.getHomePrograms = async (req, res) => {
  try {
    const programs = await Program.find({ displayOnHome: true, isActive: true })
      .sort('displayOrder')
      .select('title description category image slug');
    
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

// @desc    Get single program
// @route   GET /api/programs/:id
// @access  Public
exports.getProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    
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

// @desc    Create new program
// @route   POST /api/programs
// @access  Private
exports.createProgram = async (req, res) => {
  try {
    // Get the highest display order
    const highestOrder = await Program.findOne().sort('-displayOrder');
    const nextOrder = highestOrder ? highestOrder.displayOrder + 1 : 0;

    const program = await Program.create({
      ...req.body,
      displayOrder: nextOrder
    });

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
// @route   PUT /api/programs/:id
// @access  Private
exports.updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

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

// @desc    Delete program
// @route   DELETE /api/programs/:id
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

    await program.remove();

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

// @desc    Toggle program home page visibility
// @route   PUT /api/programs/:id/toggle-home
// @access  Private
exports.toggleHomeVisibility = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    program.displayOnHome = !program.displayOnHome;
    await program.save();

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

// @desc    Reorder programs
// @route   POST /api/programs/reorder
// @access  Private
exports.reorderPrograms = async (req, res) => {
  try {
    const { programs } = req.body;

    // Update each program's display order
    await Promise.all(
      programs.map(({ id, displayOrder }) =>
        Program.findByIdAndUpdate(id, { displayOrder })
      )
    );

    res.status(200).json({
      success: true,
      message: 'Programs reordered successfully'
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