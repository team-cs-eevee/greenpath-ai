const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

const userController = require('./controllers/userController');
const tripsController = require('./controllers/tripsController');

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3001',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

//for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

//do i need this??
app.get('/', (req, res) => {
  res.send('Welcome to greenpath ');
});

app.post('/api/login', userController.verifyUser, (req, res) => {
  console.log('login called');
  res.status(200).send(res.locals.user);
});

app.post('/api/signup', userController.createUser, (req, res) => {
  console.log('signup called');
  res.status(201).send(res.locals.newUser);
});

// app.post('/api/userinfo', userInfoController.getMapRoute, (req, res) => {
//   console.log('userinfo called');
//   res.send('userinfo');
// });

app.post('/api/trips', tripsController.createTrip, (req, res) => {
  //add route
  res.status(201).json(res.locals.newTrip);
});

app.post('/api/gettrips', tripsController.getTrips, (req, res) => {
  //return routes of given user
  res.status(200).json(res.locals.trips);
});

app.delete('/api/trips/:id', tripsController.deleteTrip, (req, res) => {
  //delete route with given id
  res.status(200).json(res.locals.deletedTrip);
});

// User info route
app.post('/api/userinfo', (req, res) => {
  try {
    const { start, end, make, model } = req.body;

    // Validate required fields
    if (!start || !end) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Start and end addresses are required',
      });
    }

    // Log the received data
    console.log('Received user info:', {
      start,
      end,
      make: make || 'Not provided',
      model: model || 'Not provided',
    });

    // TODO: Process route calculation, save to database, etc.

    res.status(200).json({
      message: 'User info received successfully',
      data: {
        start,
        end,
        vehicle: make && model ? `${make} ${model}` : 'No vehicle specified',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error processing user info:', error);
    res.status(500).json({
      error: 'Failed to process user info',
      message: error.message,
    });
  }
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
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
});

module.exports = app;
