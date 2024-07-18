const router = require('express').Router()
const reports = require('./controllers/reportController')
const users = require('./controllers/userController')
const restaurants = require('./controllers/restaurantController')
const cars = require('./controllers/carController')

// controllers
router.use('/reports', reports)
router.use('/users', users)
router.use('/restaurants', restaurants)
router.use('/cars', cars)

module.exports = router
