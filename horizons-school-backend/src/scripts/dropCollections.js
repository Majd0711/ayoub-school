const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/horizons-school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB Connected');
  await dropCollections();
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// Drop collections
const dropCollections = async () => {
  try {
    // Get list of all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    console.log('Collections found:', collections.map(c => c.name).join(', '));
    
    // Drop programs collection
    try {
      await mongoose.connection.db.dropCollection('programs');
      console.log('Dropped programs collection');
    } catch (err) {
      console.log('No programs collection to drop or error:', err.message);
    }
    
    console.log('Collections dropped successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error dropping collections:', error);
    process.exit(1);
  }
}; 