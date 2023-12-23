const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/delivery-management');

        console.log('db connected')
    } catch (error) {
        console.log('DATABASE ERROR:');
        console.log(error.message);
    }
}

module.exports = connect;