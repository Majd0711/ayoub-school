const mongoose = require('mongoose');
const Program = require('../models/Program');
const Admin = require('../models/Admin');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/horizons-school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB Connected');
  await createTestProgram();
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// Create test program
const createTestProgram = async () => {
  try {
    // Get admin user for reference
    const admin = await Admin.findOne();
    
    if (!admin) {
      console.error('No admin user found. Please run createAdmin.js first.');
      process.exit(1);
    }
    
    // Create test programs
    const testPrograms = [
      {
        title: 'Management and Leadership',
        description: 'This program focuses on developing leadership skills and management techniques for modern business environments.',
        category: 'Management',
        duration: '2 years',
        level: 'Master',
        isActive: true,
        createdBy: admin._id
      },
      {
        title: 'Financial Analysis',
        description: 'Learn financial analysis techniques and strategies for business decision making.',
        category: 'Finance',
        duration: '1 year',
        level: 'Licence',
        isActive: true,
        createdBy: admin._id
      },
      {
        title: 'Human Resources Management',
        description: 'Comprehensive program covering all aspects of modern HR management and employee relations.',
        category: 'Human Resources',
        duration: '2 years',
        level: 'Master',
        isActive: true,
        createdBy: admin._id
      },
      {
        title: 'Business English',
        description: 'Improve your English language skills for business communication and international relations.',
        category: 'Languages',
        duration: '6 months',
        level: 'Formation Continue',
        isActive: true,
        createdBy: admin._id
      }
    ];
    
    // Delete existing programs
    await Program.deleteMany({});
    console.log('Deleted existing programs');
    
    // Insert new programs
    const result = await Program.insertMany(testPrograms);
    
    console.log(`Created ${result.length} test programs:`);
    result.forEach(program => {
      console.log(`- ${program.title} (${program.category})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test programs:', error);
    process.exit(1);
  }
}; 