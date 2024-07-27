const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
    },
    { timestamps: { createdAt: 'created_at' } },
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

Restaurant.seed = async () => {
    process.stdout.write('Seeding restaurants...... ')

    await Restaurant.collection.drop()

    const restaurants = [
        {
            name: 'McDonalds',
            address: '123 Fake Street',
            phoneNumber: '1234567890',
        },
        {
            name: 'KFC',
            address: '456 Fake Street',
            phoneNumber: '0987654321',
        },
        {
            name: 'Burger King',
            address: '789 Fake Street',
            phoneNumber: '1357924680',
        },
    ]

    await Restaurant.create(restaurants)

    process.stdout.write('Done!\n')
}

module.exports = Restaurant
