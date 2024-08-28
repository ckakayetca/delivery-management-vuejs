const router = require('express').Router()
const reportManager = require('../managers/reportManager')
const carManager = require('../managers/carManager')
const restaurantManager = require('../managers/restaurantManager')
const xlsx = require('node-xlsx').default

const { isAuth, isAdmin } = require('../middlewares/auth')

function generateSheet(reports) {
    let sheets = {}
    let sheetOptions = {
        '!cols': [
            { wch: 10 },
            { wch: 20 },
            { wch: 30 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
        ],
        '!rows': [{ wpx: 40 }],
    }
    // End result should be:
    // [
    //     { name: 'Гоце Делчев', data: [] },
    //     { name: 'Манастирски Ливади', data: [] }
    // ]

    // Let's sort the reports by restaurant in key-value style:
    // {
    // 'Гоце Делчев': [],
    // 'Манастирски Ливади': []
    // }
    for (let report of reports) {
        if (!sheets[report.restaurant.name]) {
            sheets[report.restaurant.name] = []
        }

        sheets[report.restaurant.name].push(report)
    }

    // Now we need to transform the key-value pairs to the end result data above
    sheets = Object.entries(sheets).map((sheet) => {
        let restaurant = sheet[0]
        let reportsData = sheet[1]

        let totalAmountR = 0
        let totalDeliveriesR = 0
        let totalAmountTG = 0
        let totalDeliveriesTG = 0

        // transform the reports data
        reportsData = reportsData.map((report) => {
            totalAmountR += Number(report.amountR.toFixed(2))
            totalAmountTG += Number(report.amountTG.toFixed(2))
            totalDeliveriesR += Number(report.deliveriesR)
            totalDeliveriesTG += Number(report.deliveriesR)

            return [
                report.created_at,
                report.postedBy.name,
                report.restaurant.name,
                report.car.registration,
                `${report.amountR.toFixed(2)}лв.`,
                `${report.amountTG.toFixed(2)}лв.`,
                report.deliveriesR,
                report.deliveriesTG,
            ]
        })

        return {
            name: restaurant,
            data: [
                ['Дата', 'Шофьор', 'Ресторант', 'Кола', 'Оборот Р', 'Оборот T/G', 'Доставки Р', 'Доставки T/G'],
                ...reportsData,
                [
                    '',
                    '',
                    '',
                    'Общо:',
                    `${totalAmountR.toFixed(2)}лв.`,
                    `${totalAmountTG.toFixed(2)}лв.`,
                    totalDeliveriesR,
                    totalDeliveriesTG,
                ],
                [
                    '',
                    '',
                    '',
                    '',
                    '',
                    `${(totalAmountR + totalAmountTG).toFixed(2)}лв.`,
                    '',
                    totalDeliveriesR + totalDeliveriesTG,
                ],
            ],
        }
    })

    return xlsx.build(sheets, { sheetOptions })
}

// get all reports
router.get('/', async (req, res) => {
    try {
        let reports = await reportManager.getAll(req.query)

        const totalDeliveries = reports.reduce((acc, report) => acc + report.deliveriesR + report.deliveriesTG, 0)
        const totalAmount = reports.reduce((acc, report) => acc + report.totalAmount, 0).toFixed(2)
        const totalAmountR = reports.reduce((acc, report) => acc + report.amountR, 0).toFixed(2)
        const totalAmountTG = reports.reduce((acc, report) => acc + report.amountTG, 0).toFixed(2)

        res.status(200).json({
            reports,
            totals: {
                totalAmount,
                totalAmountR,
                totalAmountTG,
                totalDeliveries,
            },
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

// get my reports
router.get('/my', isAuth, async (req, res) => {
    try {
        let id = req.user._id

        const reports = await reportManager.getMyReports(id, req.query)

        const totalDeliveries = reports.reduce((acc, report) => acc + report.deliveriesR + report.deliveriesTG, 0)
        const totalAmount = reports.reduce((acc, report) => acc + report.totalAmount, 0).toFixed(2)
        const totalAmountR = reports.reduce((acc, report) => acc + report.amountR, 0).toFixed(2)
        const totalAmountTG = reports.reduce((acc, report) => acc + report.amountTG, 0).toFixed(2)

        res.status(200).json({
            reports,
            totals: {
                totalAmount,
                totalAmountR,
                totalAmountTG,
                totalDeliveries,
            },
        })
    } catch (error) {
        res.status(500).send(error)
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

// generate spreadsheet
router.post('/generate', isAdmin, async (req, res) => {
    try {
        const reports = await reportManager.getAll(req.body)

        res.status(201).send(generateSheet(reports))
    } catch (error) {
        console.log(error)
        res.status(403).json(error)
    }
})

module.exports = router
