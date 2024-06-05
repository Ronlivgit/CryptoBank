//! CHANGE TO INDEX.JS WHEN DONE TESTING
const dotenv = require('dotenv')

dotenv.config()

const {MONGO_URL , jwtSecret} = process.env

const config = {
    MONGO_URL,
    jwtSecret,
}

module.exports = { config }