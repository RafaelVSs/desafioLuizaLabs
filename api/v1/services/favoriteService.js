const favoriteRepository = require('../repositories/favoriteRepository')
const mongoose = require('mongoose')

module.exports = {
    async createFavoriteList(clientId){
        try{
            if(!clientId){
                throw new Error('Client ID is required.')
            }
            const favoriteList = await favoriteRepository.findByClientId(clientId)
            if(favoriteList){
                throw new Error('This client already has a favorites list.')
            }
            const favorite = {
                id_client: clientId,
                favorite_list: []
            }

            return await favoriteRepository.createFavoriteList(favorite)
        }catch (error){
            throw error
        }
    },

    async addProductFavoriteList(clientId, productId){
        try{
            if (!mongoose.isValidObjectId(productId)){
                throw new Error('Invalid Product ID format.')
            }
            
            const favorite = await favoriteRepository.findByClientId(clientId)
            if(!favorite){
                throw new Error('Client does not have a favorites list.')
            }

            const favoritId = favorite._id
            
            const existingProduct = await favoriteRepository.findByProductId(productId)
            if(!existingProduct){
                throw new Error('Unable to add a product that has not been registered.')
            }

            const existingProductInFavoritesList = favorite.favorite_list.includes(productId)
            if(existingProductInFavoritesList){
                throw new Error('Product is already in the favorites list.')
            }

            return await favoriteRepository.findByIdAndAddProduct(favoritId, productId)
        }catch (error){
            throw error
        }
    },

    async removeProductFavoriteList(clientId, productId){
        try{
            const favorite = await favoriteRepository.findByClientId(clientId)
            if(!favorite){
                throw new Error('Client does not have a favorites list.')
            }

            const favoriteId = favorite._id

            const existingProduct = favorite.favorite_list.includes(productId)
            if(!existingProduct){
                throw new Error('Product not found in favorites list.')
            }

            return await favoriteRepository.findByIdAndRemoveProduct(favoriteId, productId)
        }catch (error){
            throw error
        }
    },

    async getFavoritesList(clientId){
        try{
            if(!clientId){
                throw new Error('Client ID is required.')
            }

            const favoriteList = await favoriteRepository.findByClientId(clientId)
            if(!favoriteList){
                throw new Error('Client does not have a favorites list.')
            }
            return favoriteList
        }catch (error){
            throw error
        }
    },

}