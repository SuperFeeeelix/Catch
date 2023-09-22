const express = require('express');
const router = express.Router();

// Import and use the individual route files
const friendRoutes = require('./friend-routes');
const userRoutes = require('./users-routes');
const thoughtRoutes = require('./thought-routes');

// Use the imported route files
router.use('/api/friends', friendRoutes);
router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

module.exports = router;