const express = require('express');

const router = express.Router();

router.use('/users', require('./userRoutes'));
router.use('/thoughts', require('./thoughtRoutes'));

module.exports = router;
