const router = require('express').Router();
const reports = require('./controllers/reportController');
const users = require('./controllers/userController');
// controllers

router.use('/reports', reports);
router.use('/users', users);

module.exports = router;
