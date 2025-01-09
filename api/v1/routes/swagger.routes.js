const express = require('express')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const yaml = require('js-yaml')

const router = express.Router()

let swaggerDocument
try {
    const fileContents = fs.readFileSync('./OpenAPI.yaml', 'utf8')
    swaggerDocument = yaml.load(fileContents)
} catch (e) {
    console.error(e)
}

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocument))

module.exports = router