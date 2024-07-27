const Report = require('../models/Report')
const User = require('../models/User')

function transformQuery(query) {
    let transformedQuery = {}

    if (query.start_date) {
        transformedQuery.created_at = { $gte: query.start_date }
    }

    if (query.end_date) {
        transformedQuery.created_at = { $lte: query.end_date }
    }

    if (query.car) {
        transformedQuery.car = { _id: query.car }
    }

    if (query.restaurant) {
        transformedQuery.restaurant = { _id: query.restaurant }
    }

    if (query.posted_by) {
        transformedQuery.postedBy = { _id: query.posted_by }
    }

    return transformedQuery
}

// create report
exports.create = (data, ownerId) =>
    Report.create({ ...data, postedBy: ownerId }).then(async (report) => {
        await User.findByIdAndUpdate(ownerId, {
            $push: { reports: report._id },
        })

        return report
    })

// get all reports
exports.getAll = async (query = {}) => {
    let reports = await Report.find(transformQuery(query))
        .populate('postedBy', { password: 0, __v: 0 })
        .populate('car', 'color make model registration')
        .populate('restaurant', 'name')
        .lean()

    return reports
}

// get one report
exports.getOne = async (id) => await Report.findById(id).populate('postedBy', { password: 0, __v: 0 }).lean()

// get someone's reports
exports.getMyReports = async (id, query = {}) =>
    await Report.find({ ...transformQuery(query), postedBy: { _id: id } })
        .populate('car', 'color make model')
        .populate('restaurant', 'name')
        .lean()

// edit report
exports.edit = async (id, data) => await Report.findByIdAndUpdate(id, data)

// delete report
exports.del = async (id) =>
    Report.findByIdAndDelete(id).then(async (report) => {
        await User.findByIdAndUpdate(report.postedBy, {
            $pull: { reports: report._id },
        })

        return report
    })
