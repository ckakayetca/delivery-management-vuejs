require('dotenv').config()
const express = require('express')
const expressCfg = require('./config/expressCfg')
const mongooseCfg = require('./config/mongooseCfg')
const router = require('./routes')
const https = require('https')
const http = require('http')
const fs = require('fs')

const app = express()
const PORT = process.env.API_PORT

expressCfg(app)
mongooseCfg()

console.log(process.env)

if (process.env.NODE_ENV === 'production') {
    https
        .createServer(
            {
                key: fs.readFileSync('/etc/letsencrypt/live/kiutek.eu/privkey.pem'),
                cert: fs.readFileSync('/etc/letsencrypt/live/kiutek.eu/fullchain.pem'),
            },
            app,
        )
        .listen(PORT)

    console.log(`Server is running with HTTPS`)
} else {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}... without HTTPS`))
}

app.use('/api', router)
