const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas connection string from environment variable
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';
    console.log('Attempting to connect to MongoDB with URI:', mongoURI.substring(0, mongoURI.indexOf('@') > 0 ? mongoURI.indexOf('@') : 30) + '...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'horizons-school'
    });

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('MongoDB connection error details:', error.message);
    console.error('Error code:', error.code);
    console.error('Error name:', error.name);
    console.error('Full error:', error);
    
    // Instead of exiting, let's try to run without MongoDB
    console.log('Failed to connect to MongoDB. Starting server without database...');
    return false;
  }
};

module.exports = connectDB; 