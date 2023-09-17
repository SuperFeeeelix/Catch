const router = require('express').Router();
const userRoutes = require('../api-routes/users-routes');
const thoughtRoutes = require('../api-routes/thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;