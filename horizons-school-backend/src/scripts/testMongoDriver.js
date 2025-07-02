/**
 * Script to test MongoDB Atlas connection using the official MongoDB driver
 */

const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true, // Only for testing, not recommended for production
  directConnection: false,
  retryWrites: true,
  retryReads: true,
  serverSelectionTimeoutMS: 5000 // 5 seconds
};

// Create a new MongoClient
const client = new MongoClient(uri, options);

async function run() {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    console.log('This may take a moment...');
    
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    const database = client.db('horizons-school');
    await database.command({ ping: 1 });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // List all collections
    const collections = await database.listCollections().toArray();
    console.log('\nAvailable collections:');
    if (collections.length === 0) {
      console.log('No collections found. Database is empty.');
    } else {
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
    }
    
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:');
    console.error(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log('\nConnection closed.');
  }
}

run().catch(console.dir); 