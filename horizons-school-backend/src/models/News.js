const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  summary: {
    type: String,
    maxlength: [300, 'Summary cannot be more than 300 characters']
  },
  image: {
    type: String,
    default: 'default-news.jpg'
  },
  type: {
    type: String,
    required: true,
    enum: ['news', 'event', 'workshop'],
    default: 'news'
  },
  category: {
    type: String,
    enum: ['academic', 'campus', 'admissions', 'partnership', 'career', 'general'],
    default: 'general'
  },
  eventDate: {
    type: Date,
    required: function() { 
      return this.type === 'event' || this.type === 'workshop'; 
    }
  },
  eventLocation: {
    type: String,
    required: function() { 
      return this.type === 'event' || this.type === 'workshop'; 
    }
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create news/event slug from title
newsSchema.pre('save', function(next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  
  // Generate summary from content if not provided
  if (!this.summary && this.content) {
    this.summary = this.content.substring(0, 250) + (this.content.length > 250 ? '...' : '');
  }
  
  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News; 