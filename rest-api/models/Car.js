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
        active: {
            type: Boolean,
            default: true,
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
            make: 'Тойота',
            model: 'Айго',
            color: 'Сива',
            registration: 'СВ0535РТ',
            insuranceDueDate: new Date(),
            motDate: new Date(),
            nextOilChange: 1000,
        },
        {
            make: 'Пежо',
            model: '107',
            color: 'Лилаво',
            registration: 'СВ2333СР',
            insuranceDueDate: new Date(),
            motDate: new Date(),
            nextOilChange: 1000,
        },
        {
            make: 'Шевролет',
            model: 'Авео',
            color: 'Син',
            registration: 'СВ1950ТР',
            insuranceDueDate: new Date(),
            motDate: new Date(),
            nextOilChange: 1000,
        },
    ]

    await Car.create(cars)

    process.stdout.write('Done!\n')
}

module.exports = Car
