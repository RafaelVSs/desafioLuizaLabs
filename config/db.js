const mongoose = require('mongoose')
const config = require('./envsConfig')

const mongoURI = `mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`

const connection = async () => {
    try{
        await mongoose.connect(mongoURI, {})
        console.log("Connection successful!")
    } catch (error) {
        throw new Error('Erro ao conectar ao mongoDB' + error.message)
    }
}

module.exports = connection