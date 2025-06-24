const validateProgram = (req, res, next) => {
  const { title, description, category, duration, level } = req.body;
  const errors = [];

  // Validate required fields
  if (!title) errors.push('Title is required');
  if (!description) errors.push('Description is required');
  if (!category) errors.push('Category is required');
  if (!duration) errors.push('Duration is required');
  if (!level) errors.push('Level is required');

  // Validate title length
  if (title && title.length > 100) {
    errors.push('Title cannot be more than 100 characters');
  }

  // Validate category
  const validCategories = [
    'Management',
    'Finance',
    'Marketing',
    'Human Resources',
    'Languages',
    'Professional Training'
  ];
  if (category && !validCategories.includes(category)) {
    errors.push('Invalid category');
  }

  // Validate level
  const validLevels = ['Technicien', 'Licence', 'Master', 'Formation Continue'];
  if (level && !validLevels.includes(level)) {
    errors.push('Invalid level');
  }

  // Check if there are any errors
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

module.exports = {
  validateProgram
}; 