const dotenv = require('dotenv').config()

const all = {
    basePath: '/api/v1',
    env: process.env.ENVIRONMENT,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3001,
    JWT_SECRET: process.env.JWT_SECRET,

    database: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        name: process.env.MONGO_NAME,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD
    }
}

module.exports = all