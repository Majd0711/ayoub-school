const mongoose = require('mongoose');
const slugify = require('slugify');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  // Category is now optional and free-form
  category: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Please add a duration']
  },
  // Level is now optional and free-form (Licence, Master, etc.)
  level: {
    type: String,
    trim: true
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
  seats: {
    type: Number,
    min: [0, 'Seats cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOnHome: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
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
  this.slug = slugify(this.title, { lower: true });
  this.updatedAt = Date.now();
  next();
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program; 