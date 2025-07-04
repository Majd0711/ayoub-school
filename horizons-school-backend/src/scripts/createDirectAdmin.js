const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// MongoDB Atlas connection string
const atlasUri = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

async function createAdmin() {
  let client;
  try {
    // Connect to MongoDB Atlas
    console.log('Connecting to MongoDB Atlas...');
    client = new MongoClient(atlasUri);
    await client.connect();
    const db = client.db('horizons-school');
    console.log('Connected to MongoDB Atlas');

    // Admin data
    const adminData = {
      _id: "685ac1d6ed6c525ee450bd8c",
      username: "admin",
      email: "admin@horizons-school.ma",
      password: await bcrypt.hash("admin", 10),
      role: "super-admin",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Check if admin already exists
    const existingAdmin = await db.collection('admins').findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin already exists. Updating password...');
      await db.collection('admins').updateOne(
        { email: adminData.email },
        { 
          $set: { 
            password: adminData.password,
            updatedAt: new Date()
          } 
        }
      );
      console.log('Admin password updated successfully');
    } else {
      // Create new admin
      await db.collection('admins').insertOne(adminData);
      console.log('Admin created successfully');
    }

    console.log('Admin credentials:');
    console.log('Email:', adminData.email);
    console.log('Password: admin');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB Atlas connection closed');
    }
  }
}

// Run the script
createAdmin(); 