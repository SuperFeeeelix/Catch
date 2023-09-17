const router = require('express').Router();

const userRoutes = require('./users-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users-routes', userRoutes);
router.use('/thoughts-routes', thoughtRoutes);

module.exports = router;