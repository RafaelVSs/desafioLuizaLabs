const config = require('./config/envsConfig')
const dbConnection = require('./config/db')
const app = require('./app')

dbConnection()

app.listen(config.port, () => {
    console.log(`servido rodando em http://${config.host}:${config.port}`)
})