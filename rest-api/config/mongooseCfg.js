const mongoose = require('mongoose')

async function connect() {

    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`)

        console.log(`Database connected on ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`)
    } catch (error) {
        console.log('DATABASE ERROR:')
        console.log(error.message)
    }
}

module.exports = connect