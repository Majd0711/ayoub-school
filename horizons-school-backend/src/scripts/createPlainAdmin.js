const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// MongoDB connection string
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/horizons-school';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB Connected:', mongoURI);
  await createPlainAdmin();
  process.exit(0);
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// Create a plain admin directly in the database
const createPlainAdmin = async () => {
  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);
    
    // Drop the admins collection to start fresh
    try {
      await mongoose.connection.db.collection('admins').drop();
      console.log('Dropped existing admins collection');
    } catch (error) {
      console.log('No admins collection to drop or error dropping:', error.message);
    }
    
    // Insert admin with hashed password
    const result = await mongoose.connection.db.collection('admins').insertOne({
      username: 'admin',
      email: 'admin@horizons-school.ma',
      password: hashedPassword,
      role: 'super-admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Admin created successfully with ID:', result.insertedId);
    console.log({
      username: 'admin',
      email: 'admin@horizons-school.ma',
      password: 'Admin@123', // Just for display
      passwordHash: hashedPassword,
      role: 'super-admin'
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}; 