const express = require('express')
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//teste
app.get('/api/v1/', (req, res) => {
    res.send('API está funcionando!');
});

module.exports = app