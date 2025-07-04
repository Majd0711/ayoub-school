/**
 * Script to import data from JSON files to MongoDB Atlas
 */

const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

// MongoDB Atlas connection string
const atlasUri = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

// Directory with exported data
const exportDir = path.join(__dirname, '../../exports');

// Helper function to safely convert string to ObjectId
const safeObjectId = (id) => {
  try {
    return new ObjectId(id);
  } catch (error) {
    console.warn(`Invalid ObjectId: ${id}`);
    return id;
  }
};

// Helper function to generate slug from title
const generateSlug = (title, counter = '') => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') + 
    (counter ? `-${counter}` : '');
};

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
        // Special handling for admins collection
        if (collectionName === 'admins') {
          console.log('Processing admin documents...');
          
          // Clear existing data in the collection
          await db.collection(collectionName).deleteMany({});
          console.log('Cleared existing admin data');

          // Process each admin document
          for (const doc of documents) {
            // Ensure _id is properly converted to ObjectId
            if (doc._id && typeof doc._id === 'string') {
              doc._id = safeObjectId(doc._id);
            }

            try {
              await db.collection(collectionName).insertOne(doc);
              console.log(`Successfully imported admin with ID: ${doc._id}`);
            } catch (err) {
              console.error(`Error importing admin document:`, err);
              throw err; // Re-throw to stop the process
            }
          }
        }
        // Special handling for team members
        else if (collectionName === 'teammembers') {
          // Fix team members with null slugs
          let counter = 1;
          const fixedDocuments = documents.map(doc => {
            if (doc.slug === null || doc.slug === undefined) {
              const name = doc.name ? doc.name.toLowerCase().replace(/\s+/g, '-') : `team-member-${counter}`;
              doc.slug = `${name}-${counter}`;
              counter++;
            }
            if (doc._id && typeof doc._id === 'string') {
              doc._id = safeObjectId(doc._id);
            }
            return doc;
          });
          
          // Clear existing data
          await db.collection(collectionName).deleteMany({});
          console.log(`Cleared existing data in ${collectionName}`);
          
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
        }
        // Special handling for programs
        else if (collectionName === 'programs') {
          console.log('Processing programs...');
          
          // Clear existing data
          await db.collection(collectionName).deleteMany({});
          console.log(`Cleared existing data in ${collectionName}`);

          // Process each program
          let counter = 1;
          const processedDocs = documents.map(doc => {
            const newDoc = { ...doc };
            
            // Convert IDs
            if (newDoc._id && typeof newDoc._id === 'string') {
              newDoc._id = safeObjectId(newDoc._id);
            }
            if (newDoc.createdBy && typeof newDoc.createdBy === 'string') {
              newDoc.createdBy = safeObjectId(newDoc.createdBy);
            }

            // Generate slug if missing
            if (!newDoc.slug) {
              newDoc.slug = generateSlug(newDoc.title, counter);
              counter++;
            }

            return newDoc;
          });

          // Import programs one by one
          let successCount = 0;
          for (const doc of processedDocs) {
            try {
              await db.collection(collectionName).insertOne(doc);
              successCount++;
              console.log(`Imported program: ${doc.title}`);
            } catch (err) {
              console.error(`Error importing program: ${doc.title}`, err.message);
            }
          }
          console.log(`Imported ${successCount}/${documents.length} programs`);
        }
        // For other collections
        else {
          // Clear existing data
          await db.collection(collectionName).deleteMany({});
          console.log(`Cleared existing data in ${collectionName}`);

          // Convert string _id to ObjectId for all documents
          const processedDocs = documents.map(doc => {
            const newDoc = { ...doc };
            if (newDoc._id && typeof newDoc._id === 'string') {
              newDoc._id = safeObjectId(newDoc._id);
            }
            if (newDoc.createdBy && typeof newDoc.createdBy === 'string') {
              newDoc.createdBy = safeObjectId(newDoc.createdBy);
            }
            return newDoc;
          });

          // Try bulk insert
          try {
            const result = await db.collection(collectionName).insertMany(processedDocs);
            console.log(`Imported ${result.insertedCount} documents to ${collectionName}`);
          } catch (bulkError) {
            // If bulk insert fails, fall back to one-by-one insert
            console.log(`Bulk insert failed for ${collectionName}, trying one-by-one`);
            let successCount = 0;
            for (const doc of processedDocs) {
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
        throw err; // Re-throw to stop the process
      }
    }

    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1); // Exit with error
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB Atlas connection closed');
    }
  }
}

// Run the import
importData(); 