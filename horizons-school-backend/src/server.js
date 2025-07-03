const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

// Debug environment variables
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT || 5000);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'http://localhost:3000');
console.log('JWT_SECRET exists:', !!(process.env.JWT_SECRET || 'your_jwt_secret_key_here'));
console.log('JWT_EXPIRE:', process.env.JWT_EXPIRE || '30d');

// Create Express app
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Configuration - More secure for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Set static folder for public files
app.use(express.static(path.join(__dirname, '../public')));

// Set specific route for uploads to ensure they're accessible
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Define routes
const authRoutes = require('./routes/auth');
const programRoutes = require('./routes/programs');
const newsRoutes = require('./routes/news');
const teamRoutes = require('./routes/team');
const contactRoutes = require('./routes/contacts');
const settingsRoutes = require('./routes/settings');
const statsRoutes = require('./routes/stats');
const partnerRoutes = require('./routes/partners');

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/programs', programRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/team', teamRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/v1/partners', partnerRoutes);

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, '../public/admin')));

// Simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Catch-all route for admin panel SPA
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Connect to database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const dbConnected = await connectDB();
    
    if (dbConnected) {
      console.log('MongoDB connected successfully');
    } else {
      console.log('Running in database-less mode. API functionality will be limited.');
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Admin panel available at: http://localhost:${PORT}/admin`);
      console.log(`API available at: http://localhost:${PORT}/api/v1`);
    });
  } catch (err) {
    console.error('Failed to start server:');
    console.error('Error message:', err.message);
    console.error('Error name:', err.name);
    console.error('Error stack:', err.stack);
    console.error('Full error:', err);
  }
};

startServer(); 