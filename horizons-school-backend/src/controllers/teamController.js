const TeamMember = require('../models/TeamMember');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort('order');
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error: error.message });
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
exports.getTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.status(200).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team member', error: error.message });
  }
};

// @desc    Create team member
// @route   POST /api/team
// @access  Private/Admin
exports.createTeamMember = async (req, res) => {
  try {
    const { name, position, bio, department, socialLinks, order } = req.body;
    const image = req.file ? req.file.filename : 'default-profile.jpg';

    const teamMember = await TeamMember.create({
      name,
      position,
      bio,
      image,
      department,
      socialLinks: socialLinks || {},
      order: order || 0,
      createdBy: req.user.id
    });

    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team member', error: error.message });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin
exports.updateTeamMember = async (req, res) => {
  try {
    const { name, position, bio, department, socialLinks, order, isActive } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = {
      name,
      position,
      bio,
      department,
      ...(image && { image }),
      ...(socialLinks && { socialLinks }),
      ...(typeof order !== 'undefined' && { order }),
      ...(typeof isActive !== 'undefined' && { isActive })
    };

    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: 'Error updating team member', error: error.message });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
exports.deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team member', error: error.message });
  }
}; 