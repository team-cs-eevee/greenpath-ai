const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Basic test route
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Hello' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'GreenPath AI Server'
  });
});

// User info route
app.post('/api/userinfo', (req, res) => {
  try {
    const { start, end, make, model } = req.body;
    
    // Validate required fields
    if (!start || !end) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Start and end addresses are required'
      });
    }

    // Log the received data
    console.log('Received user info:', {
      start,
      end,
      make: make || 'Not provided',
      model: model || 'Not provided'
    });

    // TODO: Process route calculation, save to database, etc.
    
    res.status(200).json({ 
      message: 'User info received successfully',
      data: {
        start,
        end,
        vehicle: make && model ? `${make} ${model}` : 'No vehicle specified',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error processing user info:', error);
    res.status(500).json({ 
      error: 'Failed to process user info',
      message: error.message
    });
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
});

module.exports = app;