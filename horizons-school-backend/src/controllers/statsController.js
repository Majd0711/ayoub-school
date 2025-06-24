const Program = require('../models/Program');
const News = require('../models/News');
const Contact = require('../models/Contact');
const TeamMember = require('../models/TeamMember');

// @desc    Get program stats
// @route   GET /api/v1/stats/programs
// @access  Private
exports.getProgramStats = async (req, res) => {
  try {
    const count = await Program.countDocuments();
    
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get news stats
// @route   GET /api/v1/stats/news
// @access  Private
exports.getNewsStats = async (req, res) => {
  try {
    const count = await News.countDocuments();
    
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get contacts stats
// @route   GET /api/v1/stats/contacts
// @access  Private
exports.getContactStats = async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get team stats
// @route   GET /api/v1/stats/team
// @access  Private
exports.getTeamStats = async (req, res) => {
  try {
    const count = await TeamMember.countDocuments();
    
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get all stats
// @route   GET /api/v1/stats
// @access  Private
exports.getAllStats = async (req, res) => {
  try {
    const [programs, news, contacts, team] = await Promise.all([
      Program.countDocuments(),
      News.countDocuments(),
      Contact.countDocuments(),
      TeamMember.countDocuments()
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        programs,
        news,
        contacts,
        team
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}; 