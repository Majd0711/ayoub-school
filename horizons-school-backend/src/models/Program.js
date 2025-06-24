const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Management',
      'Finance',
      'Marketing',
      'Human Resources',
      'Languages',
      'Professional Training'
    ]
  },
  duration: {
    type: String,
    required: [true, 'Please add program duration']
  },
  level: {
    type: String,
    required: [true, 'Please add program level'],
    enum: ['Technicien', 'Licence', 'Master', 'Formation Continue']
  },
  image: {
    type: String,
    default: 'default-program.jpg'
  },
  features: [{
    type: String
  }],
  modules: [{
    title: String,
    description: String
  }],
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
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create program slug from title
programSchema.pre('save', function(next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program; 