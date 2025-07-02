/**
 * Script to start the server with MongoDB Atlas connection
 * 
 * Usage:
 * Run this script to start the server:
 * node src/scripts/startWithAtlas.js
 */

// Set MongoDB Atlas connection string with actual password
process.env.MONGODB_URI = 'mongodb+srv://contactmajde:DRJADyNhNV0N5iA5@s.4obmcmw.mongodb.net/?retryWrites=true&w=majority';

// Set other environment variables
process.env.PORT = 8080;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'horizons-school-secret-key-change-in-production';
process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';
process.env.MAX_FILE_SIZE = process.env.MAX_FILE_SIZE || 5000000;

// Start the server
require('../server'); 