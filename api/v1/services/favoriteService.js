const favoriteRepository = require('../repositories/favoriteRepository')


module.exports = {
    async createFavoriteList(clientId, favoriteList){
        try{
            if(!clientId || !favoriteList){
                throw new Error('ID and favorite list are required.')
            }
            const favorite = {
                id_client: clientId,
                favorite_list: favoriteList
            }
            return await favoriteRepository.createFavoriteList(favorite)
        }catch (error){
            throw new Error(error.message)
        }
    },

    async addProductFavoriteList(clientId, productId){
        try{
            const favorite = await favoriteRepository.findByClientId(clientId)
            if(!favorite){
                throw new Error('Client does not have a favorites list.')
            }
            const existingProduct = favorite.favorite_list.includes(productId)
            if(existingProduct){
                throw new Error('Product is already in the favorites list.')
            }
            const updatedFavorites = [...favorite.favorite_list, productId]
            await favoriteRepository.findByIdAndAddProduct(favorite._id, updatedFavorites)
            return updatedFavorites
        }catch (error){
            throw new Error('Error editing favorites list')
        }
    },

    async removeProductFavoriteList(clientId, productId){
        try{
            const favorite = await favoriteRepository.findByClientId(clientId)
            if(!favorite){
                throw new Error('Client does not have a favorites list.')
            }
            const existingProduct = favorite.favorite_list.includes(productId)
            if(!existingProduct){
                throw new Error('Product not found in favorites list.')
            }
            const updatedFavorites = await favoriteRepository.findByIdAndRemoveProduct(favorite._id, productId)
            return updatedFavorites
        }catch (error){
            throw new Error('Error removing product from favorites list: ' + error.message)
        }
    },

    async getFavoriteList(clientId){
        try{
            if(!clientId){
                throw new Error('Client ID is required.')
            }
            return await favoriteRepository.findByClientId(clientId)
        }catch (error){
            throw new Error('Favorites list not found: ' + error.message)
        }
    }
}