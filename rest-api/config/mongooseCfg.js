const mongoose = require('mongoose')
const userManager = require('../managers/userManager')

async function connect() {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`)

        if (!userManager.getUsers) {
            console.log('creating user...')
            await User.create({
                username: 'admin',
                name: 'Super Admin',
                role: 'admin',
                password: 'admin',
                tel: '0877000000'
            })
        }
        console.log(`Database connected on ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`)
    } catch (error) {
        console.log('DATABASE ERROR:')
        console.log(error.message)
    }
}

module.exports = connect
