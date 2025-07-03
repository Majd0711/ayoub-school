const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
require('dotenv').config();

// Connect to MongoDB with the provided Atlas URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

console.log('Attempting to connect to MongoDB Atlas...');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Reset admin password
const resetAdminPassword = async () => {
  try {
    // Find admin user
    const admin = await Admin.findOne({ email: 'admin@horizons-school.ma' });
    
    if (!admin) {
      console.error('Admin user not found. Creating new admin user...');
      
      // Generate password hash
      const salt = await bcrypt.genSalt(10);
      const newPassword = 'Admin@123';
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Create new admin
      const newAdmin = await Admin.create({
        username: 'admin',
        email: 'admin@horizons-school.ma',
        password: hashedPassword,
        role: 'super-admin'
      });
      
      console.log('New admin created successfully');
      console.log('Login credentials:');
      console.log(`Email: ${newAdmin.email}`);
      console.log(`Password: ${newPassword}`);
      
      // Test password match
      const isMatch = await bcrypt.compare(newPassword, newAdmin.password);
      console.log('Password match test:', isMatch);
    } else {
      console.log('Found admin user:', admin.email);
      
      // Delete and recreate admin to ensure clean password hash
      await Admin.deleteOne({ email: 'admin@horizons-school.ma' });
      console.log('Deleted existing admin user');
      
      // Generate new password hash
      const salt = await bcrypt.genSalt(10);
      const newPassword = 'Admin@123';
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Create new admin
      const newAdmin = await Admin.create({
        username: 'admin',
        email: 'admin@horizons-school.ma',
        password: hashedPassword,
        role: 'super-admin'
      });
      
      console.log('Admin recreated successfully');
      console.log('New login credentials:');
      console.log(`Email: ${newAdmin.email}`);
      console.log(`Password: ${newPassword}`);
      
      // Test password match
      const isMatch = await bcrypt.compare(newPassword, newAdmin.password);
      console.log('Password match test:', isMatch);
    }
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error resetting admin password:', error);
    process.exit(1);
  }
};

// Run the function
resetAdminPassword(); 