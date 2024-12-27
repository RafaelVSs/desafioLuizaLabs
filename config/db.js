const mongoose = require('mongoose')
const config = require('./envsConfig')

const mongoURI = `mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`

const connection = async () => {
    try{
        await mongoose.connect(mongoURI, {})
        console.log(mongoURI)
        console.log("Conexão realizada com sucesso!")
    } catch (error) {
        console.log(mongoURI)
        console.error('Erro ao conectar ao mongoDB', error)
    }
}

module.exports = connection