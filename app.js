const express = require('express')

const app = express()

app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



module.exports = app