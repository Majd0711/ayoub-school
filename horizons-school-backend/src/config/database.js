const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use environment variable with fallback
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/horizons-school';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 