/**
 * Script to check data in MongoDB Atlas collections
 */

const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    
    // Connect the client to the server
    await client.connect();
    
    // Get database
    const db = client.db('horizons-school');
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    
    console.log(`\nFound ${collections.length} collections in the database.\n`);
    
    // Check data in each collection
    for (const collection of collections) {
      const collectionName = collection.name;
      const count = await db.collection(collectionName).countDocuments();
      console.log(`Collection: ${collectionName} - ${count} documents`);
      
      if (count > 0) {
        // Show sample data (first document)
        const sample = await db.collection(collectionName).findOne({});
        console.log(`Sample document:`);
        console.log(JSON.stringify(sample, null, 2).substring(0, 300) + '...');
      } else {
        console.log('No documents found in this collection.');
      }
      console.log('-----------------------------------');
    }
    
  } catch (error) {
    console.error('Error checking data:', error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log('\nConnection closed.');
  }
}

run().catch(console.dir); 