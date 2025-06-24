const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

// Load env vars
dotenv.config({ path: '../../.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/horizons-school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createSuperAdmin = async () => {
  try {
    // Check if super-admin already exists
    const adminExists = await Admin.findOne({ role: 'super-admin' });
    if (adminExists) {
      console.log('Super admin already exists');
      process.exit(0);
    }

    // Create super-admin
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@horizons-school.ma',
      password: 'Admin@123',
      role: 'super-admin'
    });

    console.log('Super admin created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createSuperAdmin(); 