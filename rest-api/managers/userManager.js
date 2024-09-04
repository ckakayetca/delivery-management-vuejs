const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

// register

exports.register = (userData) => User.create(userData)

// login

exports.login = async (userData) => {
    let user = await User.findOne({ username: userData.username })

    if (!user) {
        throw new Error('Incorrect credentials!')
    }

    const isCorrectPass = await bcrypt.compare(userData.password, user.password)

    if (!isCorrectPass) {
        throw new Error('Incorrect credentials!')
    }

    const payload = {
        username: user.username,
        _id: user._id,
    }

    user = JSON.parse(JSON.stringify(user))
    const { password, __v, ...userDetails } = user
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

    return [token, userDetails]
}

// get users list
exports.getUsers = async () => {
    let users = await User.find({}, { password: 0, __v: 0 }).lean()

    return users
}

// get profile info
exports.getInfo = async (id) => {
    let user = await User.findOne({ _id: id }, { password: 0, __v: 0 }).populate('reports')

    if (!user) {
        throw new Error('No such user!')
    }
    return user
}

// edit profile info

exports.editInfo = async (id, data) =>
    User.findByIdAndUpdate(id, data).then((user) => {
        return user
    })

exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        return true
    } catch (error) {
        return false
    }
}

exports.deleteUser = async (id) => {
    await User.findByIdAndUpdate(id, { active: false })
}
