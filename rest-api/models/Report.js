const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        restaurant: {
            type: mongoose.Types.ObjectId,
            ref: 'Restaurant',
            required: true,
        },
        amountR: {
            type: Number,
            required: true,
        },
        deliveriesR: {
            type: Number,
            required: true,
        },
        amountTG: {
            type: Number,
            required: true,
        },
        deliveriesTG: {
            type: Number,
            required: true,
        },
        car: {
            type: mongoose.Types.ObjectId,
            ref: 'Car',
            required: true,
        },
        fuel: {
            type: Number,
            required: true,
        },
        postedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: { createdAt: 'created_at' } },
)

const Report = mongoose.model('Report', reportSchema)

module.exports = Report
