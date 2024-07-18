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

module.exports = Restaurant
