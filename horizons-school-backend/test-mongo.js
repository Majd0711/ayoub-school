require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/horizons-school';
    console.log('Attempting to connect to MongoDB with URI:', mongoURI);
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Connection successful!');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection error details:', error.message);
    console.error('Error code:', error.code);
    console.error('Error name:', error.name);
    console.error('Full error:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

testConnection(); 