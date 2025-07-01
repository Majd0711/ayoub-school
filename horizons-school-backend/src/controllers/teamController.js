const TeamMember = require('../models/TeamMember');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = async (req, res) => {
  try {
    // Build query
    let query = {};
    
    // Filter by department if provided
    if (req.query.department) {
      query.department = req.query.department;
    }
    
    // Filter by active status
    if (req.query.active) {
      query.isActive = req.query.active === 'true';
    } else {
      // Default to active members only for public API
      if (!req.user) {
        query.isActive = true;
      }
    }
    
    // Filter by featured status
    if (req.query.featured) {
      query.isFeatured = req.query.featured === 'true';
    }
    
    // Get team members
    const teamMembers = await TeamMember.find(query).sort('order');
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
    // Check if the parameter is a MongoDB ID or a slug
    const isMongoId = req.params.id.match(/^[0-9a-fA-F]{24}$/);
    
    let teamMember;
    if (isMongoId) {
      teamMember = await TeamMember.findById(req.params.id);
    } else {
      teamMember = await TeamMember.findOne({ slug: req.params.id });
    }
    
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
    const { 
      name, 
      position, 
      bio, 
      department, 
      socialLinks, 
      order,
      education,
      experience,
      specializations,
      isFeatured 
    } = req.body;
    
    const image = req.file ? req.file.filename : 'default-profile.jpg';

    // Parse JSON fields if they are strings
    const parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
    const parsedEducation = typeof education === 'string' ? JSON.parse(education) : education;
    const parsedExperience = typeof experience === 'string' ? JSON.parse(experience) : experience;
    const parsedSpecializations = typeof specializations === 'string' ? JSON.parse(specializations) : specializations;

    const teamMember = await TeamMember.create({
      name,
      position,
      bio,
      image,
      department,
      socialLinks: parsedSocialLinks || {},
      education: parsedEducation || [],
      experience: parsedExperience || [],
      specializations: parsedSpecializations || [],
      order: order || 0,
      isFeatured: isFeatured === 'true' || isFeatured === true,
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
    const { 
      name, 
      position, 
      bio, 
      department, 
      socialLinks, 
      order, 
      isActive,
      education,
      experience,
      specializations,
      isFeatured 
    } = req.body;
    
    const image = req.file ? req.file.filename : undefined;

    // Parse JSON fields if they are strings
    const parsedSocialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
    const parsedEducation = typeof education === 'string' ? JSON.parse(education) : education;
    const parsedExperience = typeof experience === 'string' ? JSON.parse(experience) : experience;
    const parsedSpecializations = typeof specializations === 'string' ? JSON.parse(specializations) : specializations;

    const updateData = {
      name,
      position,
      bio,
      department,
      ...(image && { image }),
      ...(parsedSocialLinks && { socialLinks: parsedSocialLinks }),
      ...(parsedEducation && { education: parsedEducation }),
      ...(parsedExperience && { experience: parsedExperience }),
      ...(parsedSpecializations && { specializations: parsedSpecializations }),
      ...(typeof order !== 'undefined' && { order }),
      ...(typeof isActive !== 'undefined' && { isActive: isActive === 'true' || isActive === true }),
      ...(typeof isFeatured !== 'undefined' && { isFeatured: isFeatured === 'true' || isFeatured === true })
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