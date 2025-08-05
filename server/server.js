const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

const userController = require("./controllers/userController")
const userInfoController = require('./controllers/userInfoController');
// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3001',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body);
//   next();
// });

//do i need this??
app.get('/', (req, res) => {
  res.send('Welcome to greenpath ');
});

app.post('/api/login', userController.verifyUser, (req, res) => {
  console.log('login called');
  res.send('login');
});

app.post('/api/signup', userController.createUser, (req, res) => {
  console.log('signup called');
});

app.post('/api/userinfo', userInfoController.getMapRoute, (req, res) => {
  console.log('userinfo called');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
});

module.exports = app;
