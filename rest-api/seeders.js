const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '.env'),
})

const fs = require('fs')
const connect = require('./config/mongooseCfg')

async function runSeeders() {
    await connect()

    const models = fs.readdirSync(path.resolve(__dirname, 'models'))

    for (let modelName of models) {
        try {
            const model = require(path.resolve(__dirname, 'models', modelName))

            await model.seed()
        } catch (error) {
            console.log(`Could not find ${modelName} seeder!`)
        }
    }
}

runSeeders().then(() => {
    process.exit(0)
})
