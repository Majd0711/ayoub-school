const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  group: {
    type: String,
    required: true,
    enum: [
      'contact',
      'social',
      'seo',
      'general',
      'homepage'
    ]
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Compound index for faster lookups
siteSettingSchema.index({ key: 1, group: 1 });

const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);

// Default settings
const defaultSettings = [
  {
    key: 'phone',
    value: '+212 123 456 789',
    group: 'contact',
    isPublic: true,
    description: 'Main contact phone number'
  },
  {
    key: 'email',
    value: 'contact@horizons-school.ma',
    group: 'contact',
    isPublic: true,
    description: 'Main contact email'
  },
  {
    key: 'address',
    value: 'Horizons School Address, Morocco',
    group: 'contact',
    isPublic: true,
    description: 'School physical address'
  },
  {
    key: 'workingHours',
    value: 'Lundi - Samedi: 8h30 - 22h00',
    group: 'contact',
    isPublic: true,
    description: 'School working hours'
  },
  {
    key: 'facebook',
    value: 'https://facebook.com/horizons-school',
    group: 'social',
    isPublic: true,
    description: 'Facebook page URL'
  },
  {
    key: 'linkedin',
    value: 'https://linkedin.com/company/horizons-school',
    group: 'social',
    isPublic: true,
    description: 'LinkedIn page URL'
  },
  {
    key: 'metaTitle',
    value: 'Horizons School - Formation Professionnelle au Maroc',
    group: 'seo',
    isPublic: true,
    description: 'Default meta title'
  },
  {
    key: 'metaDescription',
    value: 'École de formation professionnelle offrant des programmes en Management, Finance, Marketing et Ressources Humaines.',
    group: 'seo',
    isPublic: true,
    description: 'Default meta description'
  }
];

module.exports = {
  SiteSetting,
  defaultSettings
}; 