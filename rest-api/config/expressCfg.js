const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

function expressCfg(app) {
    app.use(cors({
        origin: true,
        credentials: true,
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}

module.exports = expressCfg;