const mongoose = require('mongoose')
const { Schema } =  mongoose

const client = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

client.pre('findOneAndUpdate', function(next){
    this.set({ updatedAt: Date.now() })
    next()
})

module.exports = mongoose.model('Client', client)