/**
 * Simple HTTP server that connects to MongoDB Atlas
 * 
 * This script creates a basic HTTP server that attempts to connect to MongoDB Atlas
 * and returns the connection status when you visit http://localhost:3030
 * 
 * Usage:
 * node src/scripts/simpleServer.js
 */

const http = require('http');
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

// Create a simple HTTP server
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  
  res.write('<h1>MongoDB Atlas Connection Test</h1>');
  res.write('<p>Attempting to connect to MongoDB Atlas...</p>');
  
  try {
    // Create a new MongoClient
    const client = new MongoClient(uri);
    
    // Connect to the MongoDB server
    await client.connect();
    
    // Verify the connection by pinging the database
    await client.db('admin').command({ ping: 1 });
    
    res.write('<p style="color: green;"><strong>✅ Successfully connected to MongoDB Atlas!</strong></p>');
    
    // Get database information
    const db = client.db('horizons-school');
    const collections = await db.listCollections().toArray();
    
    res.write('<h2>Database Information:</h2>');
    res.write(`<p>Database Name: ${db.databaseName}</p>`);
    
    res.write('<h3>Collections:</h3>');
    if (collections.length === 0) {
      res.write('<p>No collections found. Database is empty.</p>');
    } else {
      res.write('<ul>');
      collections.forEach(collection => {
        res.write(`<li>${collection.name}</li>`);
      });
      res.write('</ul>');
    }
    
    // Close the connection
    await client.close();
    res.write('<p>Connection closed.</p>');
    
  } catch (error) {
    res.write('<p style="color: red;"><strong>❌ MongoDB Atlas connection failed:</strong></p>');
    res.write(`<pre>${error.toString()}</pre>`);
    
    res.write('<h2>Troubleshooting Steps:</h2>');
    res.write('<ol>');
    res.write('<li>Verify that your IP address is whitelisted in MongoDB Atlas Network Access settings.</li>');
    res.write('<li>Check if the username and password are correct.</li>');
    res.write('<li>Ensure that the cluster is running and accessible.</li>');
    res.write('<li>Try connecting from a different network or using a VPN.</li>');
    res.write('</ol>');
  }
  
  res.end();
});

// Start the server
const PORT = 3030;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Open this URL in your browser to test the MongoDB Atlas connection.');
}); 