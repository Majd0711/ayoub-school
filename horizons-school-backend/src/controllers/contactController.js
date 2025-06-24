const Contact = require('../models/Contact');

// @desc    Get all contact submissions
// @route   GET /api/v1/contacts
// @access  Private
exports.getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = Contact.find();

    // Filter by status
    if (req.query.status) {
      query = query.where('status').equals(req.query.status);
    }

    // Filter by archived status
    if (req.query.isArchived) {
      query = query.where('isArchived').equals(req.query.isArchived === 'true');
    }

    // Search by name or email
    if (req.query.search) {
      query = query.or([
        { name: new RegExp(req.query.search, 'i') },
        { email: new RegExp(req.query.search, 'i') }
      ]);
    }

    // Execute query with pagination
    const total = await Contact.countDocuments(query);
    const contacts = await query
      .populate('programOfInterest', 'title')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: contacts.length,
      pagination: {
        page,
        limit,
        total
      },
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single contact submission
// @route   GET /api/v1/contacts/:id
// @access  Private
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('programOfInterest', 'title')
      .populate('notes.addedBy', 'username');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create contact submission
// @route   POST /api/v1/contacts
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update contact submission
// @route   PUT /api/v1/contacts/:id
// @access  Private
exports.updateContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    // Add note if provided
    if (req.body.note) {
      contact.notes.push({
        note: req.body.note,
        addedBy: req.admin.id
      });
      delete req.body.note;
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body, notes: contact.notes },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete contact submission
// @route   DELETE /api/v1/contacts/:id
// @access  Private
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    // Only super-admin can delete contacts
    if (req.admin.role !== 'super-admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete contact submissions'
      });
    }

    await contact.remove();

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