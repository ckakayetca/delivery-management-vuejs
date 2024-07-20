const router = require('express').Router()
const manager = require('../managers/carManager')
const { isAuth, isAdmin } = require('../middlewares/auth')

// get all cars
router.get('/', isAuth, async (req, res) => {
    try {
        let cars = await manager.getAll(req.query?.select)

        res.status(200).json(cars)
    } catch (error) {
        console.log(error)
    }
})

// create car

router.post('/', isAdmin, async (req, res) => {
    try {
        const data = req.body

        const car = await manager.create(data)

        res.status(201).json({
            message: 'Car created!',
            data: car,
        })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
})

// edit car
router.patch('/:id', isAdmin, async (req, res) => {
    const id = req.params.id
    const data = req.body

    try {
        const car = await manager.edit(id, data)

        res.status(200).json(car)
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
})

module.exports = router
