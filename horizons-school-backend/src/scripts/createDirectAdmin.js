const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB with the provided Atlas URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

console.log('Attempting to connect to MongoDB Atlas...');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create admin directly in the database
const createDirectAdmin = async () => {
  try {
    // Define the Admin schema directly (to bypass the pre-save hook)
    const adminSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      role: String
    }, { timestamps: true });
    
    // Create a model from this schema
    const DirectAdmin = mongoose.model('Admin', adminSchema);
    
    // Delete any existing admin
    await DirectAdmin.deleteMany({ email: 'admin@horizons-school.ma' });
    console.log('Deleted existing admin users');
    
    // Create password hash manually
    const salt = await bcrypt.genSalt(10);
    const password = 'Admin@123';
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('Generated password hash:', hashedPassword);
    
    // Create new admin directly
    const admin = await DirectAdmin.create({
      username: 'admin',
      email: 'admin@horizons-school.ma',
      password: hashedPassword,
      role: 'super-admin'
    });
    
    console.log('Admin created successfully:');
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('Password (plain):', password);
    
    // Test password match
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match test:', isMatch);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

// Run the function
createDirectAdmin(); 