const Partner = require('../models/Partner');

// @desc    Get all partners
// @route   GET /api/v1/partners
// @access  Public
exports.getPartners = async (req, res) => {
  try {
    // Build query
    let query = Partner.find();

    // Filter by partnership type
    if (req.query.partnershipType) {
      query = query.where('partnershipType').equals(req.query.partnershipType);
    }

    // Filter by active status
    if (req.query.isActive) {
      query = query.where('isActive').equals(req.query.isActive === 'true');
    }

    const partners = await query
      .populate('createdBy', 'username')
      .sort('order name');

    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single partner
// @route   GET /api/v1/partners/:id
// @access  Public
exports.getPartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id)
      .populate('createdBy', 'username');

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create partner
// @route   POST /api/v1/partners
// @access  Private
exports.createPartner = async (req, res) => {
  try {
    req.body.createdBy = req.admin.id;
    
    if (req.file) {
      req.body.logo = req.file.filename;
    }
    
    const partner = await Partner.create(req.body);

    res.status(201).json({
      success: true,
      data: partner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update partner
// @route   PUT /api/v1/partners/:id
// @access  Private
exports.updatePartner = async (req, res) => {
  try {
    let partner = await Partner.findById(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }

    // Only super-admin can update partners
    if (req.admin.role !== 'super-admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update partners'
      });
    }

    if (req.file) {
      req.body.logo = req.file.filename;
    }

    partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete partner
// @route   DELETE /api/v1/partners/:id
// @access  Private
exports.deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Partner not found'
      });
    }

    // Only super-admin can delete partners
    if (req.admin.role !== 'super-admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete partners'
      });
    }

    await partner.remove();

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