const mongoose = require('mongoose')
require('dotenv').config();

const databaseConnection = ()=>{
    return mongoose.connect(process.env.MONGODB_URL)
}

module.exports = databaseConnection