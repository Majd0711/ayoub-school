const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const path = require('path');

// Load env vars
dotenv.config();

// Create Express app
const app = express();

// CORS configuration with full access
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000', process.env.FRONTEND_URL].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the public directory
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Serve admin panel static files
app.use('/admin', express.static(path.join(__dirname, '../public/admin')));

// Import API routes
const routes = {
  auth: require('./routes/auth'),
  programs: require('./routes/programs'),
  news: require('./routes/news'),
  contacts: require('./routes/contacts'),
  settings: require('./routes/settings'),
  team: require('./routes/team'),
  stats: require('./routes/stats')
};

// Mount API routes
Object.entries(routes).forEach(([name, router]) => {
  if (router && router.stack) {
    app.use(`/api/v1/${name}`, router);
  }
});

// Admin panel routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

// API info route
app.get('/', (req, res) => {
  res.json({
    message: 'Horizons School API is running',
    endpoints: {
      api: '/api/v1',
      admin: '/admin'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Handle 404 for API routes only
app.use('/api', (req, res) => {
  console.log(`404 - API route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    success: false,
    message: 'API route not found'
  });
});

// Handle 404 for all other routes - redirect to admin panel
app.use((req, res) => {
  if (req.url.startsWith('/admin')) {
    res.sendFile(path.join(__dirname, '../public/admin/index.html'));
  } else {
    res.redirect('/admin');
  }
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    console.log('MongoDB connected successfully');

    // Then start the server
    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`Server is running on port ${PORT}`);
      console.log(`API URL: http://localhost:${PORT}/api/v1`);
      console.log(`Admin URL: http://localhost:${PORT}/admin`);
      console.log(`Time: ${new Date().toISOString()}`);
      console.log('='.repeat(50));
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer(); 