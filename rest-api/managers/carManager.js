const Car = require('../models/Car')

// create car
exports.create = async (data) => await Car.create(data)

// get all cars
exports.getAll = async (select) => {
    let cars = await Car.find({ active: true }).sort({ created_at: -1 }).lean()

    if (select) {
        cars = cars.map((r) => {
            return {
                value: r._id,
                label: `${r.color} ${r.make} ${r.model} - ${r.registration}`,
            }
        })
    }

    return cars
}

// edit car
exports.edit = async (id, data) => await Car.findByIdAndUpdate(id, data)

// delete car
exports.del = async (id) => await Car.findByIdAndUpdate(id, { active: false })
