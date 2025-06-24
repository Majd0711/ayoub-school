const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Please add a position']
  },
  image: {
    type: String,
    default: 'default-profile.jpg'
  },
  bio: {
    type: String,
    required: [true, 'Please add a bio']
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    email: String
  },
  order: {
    type: Number,
    default: 0
  },
  department: {
    type: String,
    required: [true, 'Please add a department'],
    enum: [
      'Management',
      'Academic',
      'Administrative',
      'Support'
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember; 