const router = require('express').Router()
const manager = require('../managers/restaurantManager')
const { isAuth, isAdmin } = require('../middlewares/auth')

// get all restaurants
router.get('/', isAuth, async (req, res) => {
    try {
        let restaurants = await manager.getAll(req.query?.select)

        res.status(200).json(restaurants)
    } catch (error) {
        console.log(error)
    }
})

// create restaurant

router.post('/', isAdmin, async (req, res) => {
    try {
        const data = req.body

        const restaurant = await manager.create(data)

        res.status(200).json({
            message: 'Restaurant created!',
            data: restaurant,
        })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
})

// edit restaurant
router.patch('/:id', isAdmin, async (req, res) => {
    const id = req.params.id
    const data = req.body

    try {
        const restaurant = await manager.edit(id, data)

        res.status(200).json(restaurant)
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
})

module.exports = router
