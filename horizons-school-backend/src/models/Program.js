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
    default: 'Management',
    enum: [
      'Management',
      'Finance',
      'Marketing',
      'Human Resources',
      'Languages',
      'Professional Training',
      'technical',
      'license',
      'master',
      'continuous',
      'languages',
      'Business'
    ]
  },
  duration: {
    type: String,
    default: '1 an'
  },
  level: {
    type: String,
    default: 'Tous niveaux',
    enum: [
      'Technicien',
      'Licence',
      'Master',
      'Formation Continue',
      'Bac+2',
      'Bac+3',
      'Bac+4',
      'Tous niveaux',
      'Débutant',
      'Intermédiaire',
      'Avancé',
      'Baccalauréat',
      'Niveau Bac et plus',
      'Bac+2 (DUT, BTS, DEUG)'
    ]
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
  isFeatured: {
    type: Boolean,
    default: false
  },
  seats: {
    type: Number,
    default: 20
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