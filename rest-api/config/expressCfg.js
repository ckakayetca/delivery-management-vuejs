const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { auth } = require('../middlewares/auth')

function expressCfg(app) {
    app.use(
        cors({
            origin: process.env.FRONTEND_URL,
            credentials: true,
        }),
    )
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(auth)
}

module.exports = expressCfg
