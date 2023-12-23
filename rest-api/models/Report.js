const mongoose = require('mongoose');

const restaurantsList = ['Pirin',
    'Goce Delchev',
    'Lozenets',
    'Cherkovna',
    'Studentski 1',
    'Studentski 2',
    'Hristo Vakarelski',
    'Mladost']

const reportSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        restaurant: {
            type: String,
            required: true,
            validate: {
                validator: (v) => {
                    return restaurantsList.includes(v);
                },
                message: (v) => `${v.value} is not a valid restaurant!`
            }
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
            type: String,
            required: true,
        },
        fuel: {
            type: Number,
            required: true,
        },
        postedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: { createdAt: 'created_at' } }
);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;