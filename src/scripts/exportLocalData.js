/**
 * Script to export data from local MongoDB to JSON files
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Local MongoDB connection string
const localUri = 'mongodb://localhost:27017/horizons-school';

// Directory to save exported data
const exportDir = path.join(__dirname, '../../exports');

// Ensure export directory exists
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

async function exportData() {
  let client;
  try {
    console.log('Connecting to local MongoDB...');
    client = new MongoClient(localUri);
    await client.connect();
    const db = client.db('horizons-school');
    console.log('Connected to local MongoDB');

    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections`);

    // Export each collection
    for (const collection of collections) {
      const collectionName = collection.name;
      console.log(`Exporting collection: ${collectionName}`);
      
      // Skip system collections
      if (collectionName.startsWith('system.')) {
        console.log(`Skipping system collection: ${collectionName}`);
        continue;
      }

      // Get all documents from the collection
      const documents = await db.collection(collectionName).find({}).toArray();
      console.log(`Found ${documents.length} documents in ${collectionName}`);

      // Save to JSON file
      const filePath = path.join(exportDir, `${collectionName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(documents, null, 2));
      console.log(`Exported ${collectionName} to ${filePath}`);
    }

    console.log('Export completed successfully!');
  } catch (error) {
    console.error('Error exporting data:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the export
exportData(); 