/**
 * Script to import data from JSON files to MongoDB Atlas
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// MongoDB Atlas connection string
const atlasUri = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

// Directory with exported data
const exportDir = path.join(__dirname, '../../exports');

async function importData() {
  let client;
  try {
    // Check if export directory exists
    if (!fs.existsSync(exportDir)) {
      console.error(`Export directory not found: ${exportDir}`);
      console.log('Please run exportLocalData.js first to export your data');
      return;
    }

    // Get list of export files
    const files = fs.readdirSync(exportDir).filter(file => file.endsWith('.json'));
    
    if (files.length === 0) {
      console.error('No export files found');
      console.log('Please run exportLocalData.js first to export your data');
      return;
    }

    console.log(`Found ${files.length} export files`);

    // Connect to MongoDB Atlas
    console.log('Connecting to MongoDB Atlas...');
    client = new MongoClient(atlasUri);
    await client.connect();
    const db = client.db('horizons-school');
    console.log('Connected to MongoDB Atlas');

    // Import each collection
    for (const file of files) {
      const collectionName = path.basename(file, '.json');
      console.log(`Importing collection: ${collectionName}`);

      // Read the JSON file
      const filePath = path.join(exportDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const documents = JSON.parse(fileContent);

      if (documents.length === 0) {
        console.log(`No documents to import for ${collectionName}`);
        continue;
      }

      console.log(`Found ${documents.length} documents to import for ${collectionName}`);

      // Clear existing data in the collection
      await db.collection(collectionName).deleteMany({});
      console.log(`Cleared existing data in ${collectionName}`);

      // Import documents
      const result = await db.collection(collectionName).insertMany(documents);
      console.log(`Imported ${result.insertedCount} documents to ${collectionName}`);
    }

    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB Atlas connection closed');
    }
  }
}

// Run the import
importData(); 