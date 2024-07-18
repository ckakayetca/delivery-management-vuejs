const Restaurant = require('../models/Restaurant')
const User = require('../models/User')

// create restaurant

exports.create = (data, ownerId) =>
    Restaurant.create({ ...data, postedBy: ownerId }).then(async (restaurant) => {
        const newUser = await User.findByIdAndUpdate(ownerId, {
            $push: { restaurants: restaurant._id },
        })
        return restaurant
    })

// get all restaurants

exports.getAll = async (type) => {
    let restaurants = await Restaurant.find().populate('postedBy', { password: 0, __v: 0 }).lean()

    if (type) {
        restaurants = restaurants.filter((r) => r.type == type)
    }

    return restaurants
}

// get one restaurant

exports.getOne = async (id) => await Restaurant.findById(id).populate('postedBy', { password: 0, __v: 0 }).lean()

// get someone's restaurants

exports.getMyRestaurants = async (id) => await Restaurant.find({ postedBy: { _id: id } })

// edit restaurant

exports.edit = async (id, data) => await Restaurant.findByIdAndUpdate(id, data)

// delete restaurant

exports.del = async (id) =>
    Restaurant.findByIdAndDelete(id).then(async (restaurant) => {
        const newUser = await User.findByIdAndUpdate(restaurant.postedBy, {
            $pull: { restaurants: restaurant._id },
        })

        return restaurant
    })
