const router = require('express').Router()
const reportManager = require('../managers/reportManager')
const carManager = require('../managers/carManager')
const restaurantManager = require('../managers/restaurantManager')

const { isAuth } = require('../middlewares/auth')

// get all reports
router.get('/', async (req, res) => {
    try {
        let reports = await reportManager.getAll(req.query?.type)

        res.status(200).json(reports)
    } catch (error) {
        res.send(error)
    }
})

// get my reports
router.get('/my', isAuth, async (req, res) => {
    try {
        let id = req.user._id

        const reports = await reportManager.getMyReports(id)

        res.status(200).json(reports)
    } catch (error) {
        res.send(error)
    }
})

// get details needed to create a report
router.get('/create', async (req, res) => {
    try {
        let cars = await carManager.getAll(true)
        let restaurants = await restaurantManager.getAll(true)

        res.status(200).json({
            cars,
            restaurants,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get one report
router.get('/:id', async (req, res) => {
    const reportId = req.params.id

    try {
        const report = await reportManager.getOne(reportId)

        res.status(200).json(report)
    } catch (error) {
        res.status(404).send({ message: '404 Not Found' })
    }
})

// edit report
router.patch('/:id', isAuth, async (req, res) => {
    const reportId = req.params.id
    const data = req.body

    try {
        const report = await reportManager.getOne(reportId)
        if (req.user._id.toString() !== report.postedBy._id.toString()) {
            throw new Error('You are not allowed to edit this report!')
        }

        const updatedReport = await reportManager.edit(reportId, data)

        res.status(200).json(updatedReport)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})

// delete report
router.delete('/:id', isAuth, async (req, res) => {
    try {
        const resp = await reportManager.del(req.params.id)
        res.status(200).json(resp)
    } catch (error) {
        res.status(401).send({ message: error.message })
    }
})

// create report
router.post('/', isAuth, async (req, res) => {
    const data = req.body
    try {
        let id = req.user._id
        const post = await reportManager.create(data, id)

        res.status(201).json(post)
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router
