const express = require('express')
const routerClient = require('./api/v1/routes/client.routes')
const routerAuth = require('./api/v1/routes/auth.routes')
const routerProduct = require('./api/v1/routes/product.routes')
const envsConfig = require('./config/envsConfig')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`${envsConfig.basePath}/auth`, routerAuth)
app.use(`${envsConfig.basePath}/clients`, routerClient)
app.use(`${envsConfig.basePath}/products`, routerProduct)

module.exports = app