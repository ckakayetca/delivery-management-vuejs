const express = require('express');
const expressCfg = require('./config/expressCfg');
const mongooseCfg = require('./config/mongooseCfg');


const app = express();
const PORT = 3000;

expressCfg(app);
mongooseCfg();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
