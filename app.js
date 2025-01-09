const express = require('express')
const routerClient = require('./api/v1/routes/client.routes')
const routerAuth = require('./api/v1/routes/auth.routes')
const routerProduct = require('./api/v1/routes/product.routes')
const routerFavoritesList = require('./api/v1/routes/favorite.routes')
const routerSwagger = require('./api/v1/routes/swagger.routes')
const cors = require('cors')
const envsConfig = require('./config/envsConfig')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`${envsConfig.basePath}/auth`, routerAuth)
app.use(`${envsConfig.basePath}/clients`, routerClient)
app.use(`${envsConfig.basePath}/products`, routerProduct)
app.use(`${envsConfig.basePath}/favorites`, routerFavoritesList)
app.use(`${envsConfig.basePath}/doc`, routerSwagger)

module.exports = app