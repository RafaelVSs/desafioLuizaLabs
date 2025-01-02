const Favorite = require('../models/Favorite')

module.exports = {
    async findByClientId(clientId){
        try{
            const favorites = await Favorite.findOne({clientId: clientId})
            return favorites 
        }catch (error){
            throw new Error('Error searching favorites list.')
        }
    },

    async createFavoriteList(favorite){
        try{
            const newFavorite = new Favorite(favorite)
            return await newFavorite.save()
        }catch (error){
            throw new Error('Error creating favorites list: ' + error.message)
        }
    },

    async deleteFavoriteList(favoriteId){
        try{
            return await Favorite.findByIdAndDelete(favoriteId)
        }catch (error){
            throw new Error('Error deleting favorites list: ' + error.message)
        }
    },

    async findByIdAndAddProduct(favoriteId, favoriteList){
        try{
            const updatedFavoriteList = await Favorite.findByIdAndUpdate(favoriteId, favoriteList)
            return updatedFavoriteList
        }catch (error){
            throw new Error('Error updating favorites list: ' + error.message)
        }
    }, 

    async findByIdAndRemoveProduct(favoriteId, productId){
        try{
            const updatedFavoriteList = await Favorite.findByIdAndUpdate(
                favoriteId, 
                { $pull: {favorite_list: productId} }, { new: true }
            )
            return updatedFavoriteList.favorite_list
        }catch (error){
            throw new Error('Error removing product from favorites: ' + error.message)
        }
    }
}
