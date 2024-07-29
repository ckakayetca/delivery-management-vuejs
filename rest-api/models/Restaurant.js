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
            name: 'Манастирски Ливади',
            address: 'ул. Пирин 89',
            phoneNumber: '1234567890',
        },
        {
            name: 'Гоце Делчев',
            address: 'ул. Кестенова гора 19',
            phoneNumber: '0987654321',
        },
        {
            name: 'Черковна',
            address: 'ул. Русалка 28',
            phoneNumber: '1357924680',
        },
    ]

    await Restaurant.create(restaurants)

    process.stdout.write('Done!\n')
}

module.exports = Restaurant
