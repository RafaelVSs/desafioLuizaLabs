const mongoose = require('mongoose')
const { Schema } =  mongoose

const client = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
})

module.exports = mongoose.model('Client', client)