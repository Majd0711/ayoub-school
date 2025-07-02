const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

// Create Express app
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
};

app.use(cors(corsOptions));

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

// Mount routes - both with and without v1 prefix for compatibility
app.use('/api/v1/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/v1/programs', programRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/v1/team', teamRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/v1/partners', partnerRoutes);
app.use('/api/partners', partnerRoutes);

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
    await connectDB();
    console.log('MongoDB connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Admin panel available at: http://localhost:${PORT}/admin`);
      console.log(`API available at: http://localhost:${PORT}/api/v1`);
      console.log(`API also available at: http://localhost:${PORT}/api`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer(); 