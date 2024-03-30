const router = require('express').Router();
const manager = require('../managers/reportManager');
const { isAuth } = require('../middlewares/auth');

// get all reports
router.get('/', async (req, res) => {
    try {
        let reports = await manager.getAll();

        res.status(200).json(reports);
    } catch (error) {
        res.send(error);
    }
});

// get my reports
router.get('/my-reports', isAuth, async (req, res) => {
    try {
        let id = req.user._id;

        const reports = await manager.getMyReports(id);

        res.status(200).json(reports);
    } catch (error) {
        res.send(error);
    }
});

// get one report
router.get('/:id', async (req, res) => {
    const reportId = req.params.id;

    try {
        const report = await manager.getOne(reportId);

        console.log(report)
        res.status(200).json(report);
    } catch (error) {
        res.status(404).send({ message: '404 Not Found' })
    }
});

// edit report
router.put('/:id', isAuth, async (req, res) => {
    console.log(`PUT /REPORTS/ID/`);
    const reportId = req.params.id;
    const data = req.body;

    try {
        const report = await manager.getOne(reportId);
        if (req.user._id.toString() !== report.postedBy._id.toString()) {
            throw new Error('You are not allowed to edit this report!');
        }

        const updatedReport = await manager.edit(reportId, data);

        res.status(200).json(updatedReport)
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

// delete report
router.delete('/:id', isAuth, async (req, res) => {
    try {
        const resp = await manager.del(req.params.id);
        res.status(200).json(resp);
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
});

// create report
router.post('/create', isAuth, async (req, res) => {
    console.log('POST /REPORTS/CREATE');
    const data = req.body;
    try {
        let id = req.user._id;
        const post = await manager.create(data, id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router;