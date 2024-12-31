const mongoose = require('mongoose')
const { Schema } = mongoose

const favorite = new Schema({
    id_client: { type: String, required: true },
    products: { type: Array, required: true, default: [] }
})

module.exports = mongoose.model('Favorite', favorite)