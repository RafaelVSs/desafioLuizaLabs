const mongoose = require('mongoose');
const { Schema } = mongoose;

const product = new Schema ({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }
})

module.exports = mongoose.model('Product', product)