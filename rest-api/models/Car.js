const mongoose = require('mongoose')

const carSchema = new mongoose.Schema(
    {
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        registration: {
            type: String,
            required: true,
        },
        insuranceDueDate: {
            type: Date,
            required: true,
        },
        motDate: {
            type: Date,
            required: true,
        },
        nextOilChange: {
            type: Number,
            required: true,
        },
    },
    { timestamps: { createdAt: 'created_at' } },
)

const Car = mongoose.model('Car', carSchema)

module.exports = Car
