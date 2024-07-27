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

Car.seed = async () => {
    process.stdout.write('Seeding cars...... ')

    await Car.collection.drop()

    const cars = [
        {
            make: 'Toyota',
            model: 'Corolla',
            color: 'Red',
            registration: 'ABC123',
            insuranceDueDate: new Date(),
            motDate: new Date(),
            nextOilChange: 1000,
        },
        {
            make: 'Toyota',
            model: 'Corolla',
            color: 'Blue',
            registration: 'DEF456',
            insuranceDueDate: new Date(),
            motDate: new Date(),
            nextOilChange: 1000,
        },
        {
            make: 'Toyota',
            model: 'Corolla',
            color: 'Green',
            registration: 'GHI789',
            insuranceDueDate: new Date(),
            motDate: new Date(),
            nextOilChange: 1000,
        },
    ]

    await Car.create(cars)

    process.stdout.write('Done!\n')
}

module.exports = Car
