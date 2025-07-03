const { MongoClient } = require('mongodb');

async function testDirectConnection() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    console.log('Attempting to connect directly to MongoDB...');
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    
    const dbList = await client.db().admin().listDatabases();
    console.log('Databases:');
    dbList.databases.forEach(db => console.log(` - ${db.name}`));
    
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

testDirectConnection().catch(console.error); 