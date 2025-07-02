/**
 * Script to test MongoDB Atlas connection
 * 
 * Usage:
 * node src/scripts/testAtlasConnection.js
 */

const mongoose = require('mongoose');

// MongoDB Atlas connection string with actual password
const mongoURI = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

async function testConnection() {
  console.log('Testing connection to MongoDB Atlas...');
  
  try {
    // Connect to MongoDB Atlas
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'horizons-school'
    });

    console.log('✅ MongoDB Atlas connection successful!');
    console.log(`Connected to: ${conn.connection.host}`);
    console.log(`Database name: ${conn.connection.name}`);
    
    // List all collections in the database
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('\nAvailable collections:');
    if (collections.length === 0) {
      console.log('No collections found. Database is empty.');
    } else {
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
    }

    // Close the connection
    await mongoose.connection.close();
    console.log('\nConnection closed.');
    
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:');
    console.error(error);
  }
}

// Run the test
testConnection(); 