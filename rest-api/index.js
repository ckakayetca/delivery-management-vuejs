require('dotenv').config()
const express = require('express')
const expressCfg = require('./config/expressCfg')
const mongooseCfg = require('./config/mongooseCfg')
const router = require('./routes')

const app = express()
const PORT = process.env.API_PORT

expressCfg(app)
mongooseCfg()

app.use('/api', router)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
