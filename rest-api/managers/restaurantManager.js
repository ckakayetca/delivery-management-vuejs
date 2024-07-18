const Restaurant = require('../models/Restaurant')

// create restaurant
exports.create = async (data) => await Restaurant.create(data)

// get all restaurants
exports.getAll = async (select) => {
    let restaurants = await Restaurant.find().lean()

    if (select) {
        restaurants = restaurants.map((r) => {
            return {
                value: r._id,
                label: r.name,
            }
        })
    }

    return restaurants
}

// edit restaurant
exports.edit = async (id, data) => await Restaurant.findByIdAndUpdate(id, data)

// delete restaurant
exports.del = async (id) => await Restaurant.findByIdAndDelete(id)
