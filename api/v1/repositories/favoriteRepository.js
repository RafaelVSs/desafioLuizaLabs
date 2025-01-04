const Favorite = require('../models/Favorite')
const productRepository = require('../repositories/productRepository')


module.exports = {
    async findByClientId(clientId){
        try{
            const favorite = await Favorite.findOne({id_client: clientId})
            return favorite 

        }catch (error){
            throw error
        }
    },

    async findByProductId(productId){
        try{
            const product = await productRepository.findById(productId)
            return product

        }catch (error){
            throw error
        }
    },

    async createFavoriteList(favorite){
        try{
            const newFavorite = new Favorite(favorite)
            return await newFavorite.save()

        }catch (error){
            throw error
        }
    },

    async findByIdAndAddProduct(favoriteId, productId){
        try{
            const updatedFavoriteList = await Favorite.findByIdAndUpdate(
                favoriteId, 
                { $addToSet: { favorite_list: productId } },
                { new: true }
            )
            return updatedFavoriteList

        }catch (error){
            throw error
        }
    }, 

    async findByIdAndRemoveProduct(favoriteId, productId){
        try{
            const updatedFavoriteList = await Favorite.findByIdAndUpdate(
                favoriteId, 
                { $pull: {favorite_list: productId} }, 
                { new: true }
            )
            return updatedFavoriteList.favorite_list

        }catch (error){
            throw error
        }
    },

}
