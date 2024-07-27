const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(`${process.env.DB_URI}${process.env.DB_COLLECTION}`)

        console.log(`Database connected on ${process.env.DB_URI}${process.env.DB_COLLECTION}`)
    } catch (error) {
        console.log('DATABASE ERROR:')
        console.log(error.message)
    }
}

module.exports = connect
