const Report = require('../models/Report')
const User = require('../models/User')

// create report

exports.create = (data, ownerId) =>
    Report.create({ ...data, postedBy: ownerId }).then(async (report) => {
        const newUser = await User.findByIdAndUpdate(ownerId, {
            $push: { reports: report._id },
        })
        return report
    })

// get all reports

exports.getAll = async (type) => {
    let reports = await Report.find().populate('postedBy', { password: 0, __v: 0 }).lean()

    if (type) {
        reports = reports.filter((r) => r.type == type)
    }

    return reports
}

// get one report

exports.getOne = async (id) => await Report.findById(id).populate('postedBy', { password: 0, __v: 0 }).lean()

// get someone's reports

exports.getMyReports = async (id) => await Report.find({ postedBy: { _id: id } })

// edit report

exports.edit = async (id, data) => await Report.findByIdAndUpdate(id, data)

// delete report

exports.del = async (id) =>
    Report.findByIdAndDelete(id).then(async (report) => {
        const newUser = await User.findByIdAndUpdate(report.postedBy, {
            $pull: { reports: report._id },
        })

        return report
    })
