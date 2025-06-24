const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/horizons-school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

const resetAdmin = async () => {
  try {
    // Delete any existing admin with this email
    await Admin.deleteOne({ email: 'admin@horizons-school.ma' });
    console.log('Deleted existing admin if any');

    // Create a new admin with known credentials
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);
    
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@horizons-school.ma',
      password: hashedPassword,
      role: 'super-admin'
    });

    console.log('Admin reset successfully:');
    console.log({
      username: admin.username,
      email: admin.email,
      role: admin.role
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin:', error);
    process.exit(1);
  }
};

resetAdmin(); 