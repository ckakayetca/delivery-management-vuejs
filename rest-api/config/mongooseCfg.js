const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`);

        console.log('db connected')
    } catch (error) {
        console.log('DATABASE ERROR:');
        console.log(error.message);
    }
}

module.exports = connect;