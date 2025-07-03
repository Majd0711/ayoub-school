/**
 * Script to set up environment variables for MongoDB Atlas connection
 * 
 * Usage:
 * 1. Run this script before starting the server:
 *    node src/scripts/setupEnv.js && node src/server.js
 */

const fs = require('fs');
const path = require('path');

// Environment variables configuration with actual password
const envConfig = `
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority

# MongoDB Database Name
MONGODB_NAME=horizons-school

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# JWT Secret for Authentication
JWT_SECRET=horizons-school-secret-key-change-in-production
JWT_EXPIRE=30d

# File Upload Limits
MAX_FILE_SIZE=5000000
`;

// Path to .env file
const envPath = path.join(__dirname, '../../.env');

// Write .env file
try {
  fs.writeFileSync(envPath, envConfig);
  console.log('.env file created successfully at:', envPath);
  console.log('MongoDB Atlas connection configured with the provided credentials');
} catch (error) {
  console.error('Error creating .env file:', error);
  process.exit(1);
} 