const { SiteSetting, defaultSettings } = require('../models/SiteSetting');

// @desc    Get all settings
// @route   GET /api/v1/settings
// @access  Public/Private (based on isPublic flag)
exports.getSettings = async (req, res) => {
  try {
    let query = {};
    
    // If not admin, only return public settings
    if (!req.admin) {
      query.isPublic = true;
    }

    // Filter by group
    if (req.query.group) {
      query.group = req.query.group;
    }

    const settings = await SiteSetting.find(query)
      .populate('updatedBy', 'username')
      .sort('group key');

    res.status(200).json({
      success: true,
      count: settings.length,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single setting
// @route   GET /api/v1/settings/:key
// @access  Public/Private (based on isPublic flag)
exports.getSetting = async (req, res) => {
  try {
    const setting = await SiteSetting.findOne({ key: req.params.key })
      .populate('updatedBy', 'username');

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    // Check if setting is private and user is not admin
    if (!setting.isPublic && !req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this setting'
      });
    }

    res.status(200).json({
      success: true,
      data: setting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update setting
// @route   PUT /api/v1/settings/:key
// @access  Private
exports.updateSetting = async (req, res) => {
  try {
    let setting = await SiteSetting.findOne({ key: req.params.key });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found'
      });
    }

    // Only super-admin can update settings
    if (req.admin.role !== 'super-admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update settings'
      });
    }

    setting = await SiteSetting.findOneAndUpdate(
      { key: req.params.key },
      { ...req.body, updatedBy: req.admin.id },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: setting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Initialize default settings
// @route   POST /api/v1/settings/init
// @access  Private
exports.initializeSettings = async (req, res) => {
  try {
    // Only super-admin can initialize settings
    if (req.admin.role !== 'super-admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to initialize settings'
      });
    }

    // Add updatedBy field to all default settings
    const settingsWithAdmin = defaultSettings.map(setting => ({
      ...setting,
      updatedBy: req.admin.id
    }));

    // Insert all settings at once
    await SiteSetting.insertMany(settingsWithAdmin);

    res.status(201).json({
      success: true,
      message: 'Default settings initialized successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}; 