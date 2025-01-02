const mongoose = require('mongoose')
const { Schema } = mongoose

const favorite = new Schema({
    id_client: { type: String, required: true, unique: true },
    favorite_list: { type: Array, required: true, default: [] }
})

favorite.pre('save', async function(next){
    const existingFavorite = await mongoose.model('Favorite').findOne({ id_client: this.id_client })
    if(existingFavorite){
        return next(new Error('This client already has a favorites list.'))
    }
    next()
})

module.exports = mongoose.model('Favorite', favorite)