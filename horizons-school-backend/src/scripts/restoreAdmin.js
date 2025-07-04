const { MongoClient, ObjectId } = require('mongodb');

// MongoDB Atlas connection string
const atlasUri = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

async function restoreAdmin() {
  let client;
  try {
    // Connect to MongoDB Atlas
    console.log('Connecting to MongoDB Atlas...');
    client = new MongoClient(atlasUri);
    await client.connect();
    const db = client.db('horizons-school');
    console.log('Connected to MongoDB Atlas');

    // Original admin data
    const adminData = {
      _id: new ObjectId("685ac1d6ed6c525ee450bd8c"),
      username: "admin",
      email: "admin@horizons-school.ma",
      password: "$2a$10$h1NHFUb1VgUruHozPURQNuil.RorlFCAuDIgWslAPC1PWrPX2/4z2",
      role: "super-admin",
      createdAt: new Date("2025-06-24T15:18:46.696Z"),
      updatedAt: new Date("2025-06-24T15:18:46.696Z")
    };

    // Delete any existing admin
    await db.collection('admins').deleteMany({});
    console.log('Removed all existing admins');

    // Insert the original admin data
    await db.collection('admins').insertOne(adminData);
    console.log('Original admin data restored successfully');

    // Verify the admin exists
    const admin = await db.collection('admins').findOne({ _id: adminData._id });
    if (admin) {
      console.log('Admin verified in database:', admin.email);
    } else {
      console.log('Warning: Admin not found after insertion');
    }

  } catch (error) {
    console.error('Error restoring admin:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB Atlas connection closed');
    }
  }
}

// Run the script
restoreAdmin(); 