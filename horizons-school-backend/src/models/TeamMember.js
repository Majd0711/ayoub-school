const mongoose = require('mongoose');
const slugify = require('slugify');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  slug: {
    type: String,
    unique: true
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
  education: [{
    degree: String,
    institution: String,
    year: String
  }],
  experience: [{
    title: String,
    company: String,
    period: String,
    description: String
  }],
  specializations: [String],
  socialLinks: {
    linkedin: String,
    twitter: String,
    email: String,
    website: String
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
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Create slug from name
teamMemberSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  
  this.slug = slugify(this.name, { lower: true });
  next();
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember; 