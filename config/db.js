const mongoose = require('mongoose')
const config = require('./envsConfig')

const mongoURI = `mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`

const connection = async () => {
    try{
        await mongoose.connect(mongoURI, {
            authSource: 'admin',
            user: config.database.user,
            pass: config.database.password
        })
        console.log("Connection successful!")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    }
}

module.exports = connection