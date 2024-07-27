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
        totalAmount: {
            type: Number,
        },
        totalDeliveries: {
            type: Number,
        },
        postedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: { createdAt: 'created_at' } },
)

reportSchema.pre('save', function (next) {
    this.amountR = this.amountR.toFixed(2)
    this.amountTG = this.amountTG.toFixed(2)
    this.fuel = this.fuel.toFixed(2)

    this.totalAmount = this.amountR + this.amountTG
    this.totalDeliveries = this.deliveriesR + this.deliveriesTG

    next()
})

const Report = mongoose.model('Report', reportSchema)

Report.seed = async () => {
    process.stdout.write('Seeding reports...... ')

    await Report.collection.drop()

    process.stdout.write('Done!\n')
}

module.exports = Report
