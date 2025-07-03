const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../config/database');

const resetAdmin = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database successfully');

    const email = 'admin@horizons-school.ma';
    const password = 'Admin@123';

    // Delete any existing admin with this email
    await Admin.deleteOne({ email });
    console.log('Cleaned up any existing admin accounts');

    // Create new admin with plain password (will be hashed by the model)
    const admin = await Admin.create({
      username: 'Admin',
      email,
      password,
      role: 'admin'
    });
    
    console.log('Admin account created successfully');
    console.log('\nAdmin credentials:');
    console.log('Email:', email);
    console.log('Password:', password);

    // Test the login
    const testAdmin = await Admin.findOne({ email }).select('+password');
    if (testAdmin) {
      const isMatch = await testAdmin.matchPassword(password);
      console.log('\nPassword verification test:', isMatch ? 'PASSED' : 'FAILED');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

resetAdmin(); 