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

      try {
        // Clear existing data in the collection
        await db.collection(collectionName).deleteMany({});
        console.log(`Cleared existing data in ${collectionName}`);

        // Special handling for team members
        if (collectionName === 'teammembers') {
          // Fix team members with null slugs
          let counter = 1;
          const fixedDocuments = documents.map(doc => {
            if (doc.slug === null || doc.slug === undefined) {
              // Generate a unique slug based on name or counter
              const name = doc.name ? doc.name.toLowerCase().replace(/\s+/g, '-') : `team-member-${counter}`;
              doc.slug = `${name}-${counter}`;
              counter++;
            }
            return doc;
          });
          
          // Import documents one by one
          let successCount = 0;
          for (const doc of fixedDocuments) {
            try {
              await db.collection(collectionName).insertOne(doc);
              successCount++;
            } catch (err) {
              console.error(`Error importing team member: ${err.message}`);
              console.error('Document that caused error:', JSON.stringify(doc));
            }
          }
          console.log(`Imported ${successCount}/${documents.length} team members`);
        } else {
          // For other collections, try bulk insert first
          try {
            const result = await db.collection(collectionName).insertMany(documents);
            console.log(`Imported ${result.insertedCount} documents to ${collectionName}`);
          } catch (bulkError) {
            // If bulk insert fails, fall back to one-by-one insert
            console.log(`Bulk insert failed for ${collectionName}, trying one-by-one`);
            let successCount = 0;
            for (const doc of documents) {
              try {
                await db.collection(collectionName).insertOne(doc);
                successCount++;
              } catch (err) {
                console.error(`Error importing document in ${collectionName}:`, err.message);
              }
            }
            console.log(`Imported ${successCount}/${documents.length} documents to ${collectionName}`);
          }
        }
      } catch (err) {
        console.error(`Error processing collection ${collectionName}:`, err.message);
      }
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