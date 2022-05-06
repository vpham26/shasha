const router = require('express').Router();
const userRoutes = require('./user-routes');
const messageRoutes = require('./message-routes');

router.use('/messages', messageRoutes);
router.use('/users', userRoutes);

module.exports = router;