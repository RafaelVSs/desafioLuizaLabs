const favoriteService = require('../services/favoriteService')
const favoritesSchema = require('../schemas/favoritesSchema')

module.exports = {
    async createFavoriteList(req, res){
        try{
            const clientId = req.params.id
            const newFavoriteList = await favoriteService.createFavoriteList(clientId)
            return res.status(201).json(newFavoriteList)

        }catch (error){
            if(error.message === 'Client ID is required.'){
                return res.status(400).json({ message: error.message })
            }

            if(error.message === 'This client already has a favorites list.'){
                return res.status(409).json({ message: error.message })
            }

            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },

    async addProductFavoriteList(req, res){
        try{
            const clientId = req.params.id
            const productId = req.body.productId

            const { error } = favoritesSchema.productIdSchema.validate(req.body)
            if(error){
                throw new Error('Product ID is required.')
            }    

            const FavoriteList = await favoriteService.addProductFavoriteList(clientId, productId)
            return res.status(200).json(FavoriteList)

        }catch (error){
            if(error.message === 'Product ID is required.'){
                return res.status(400).json({ message: error.message })
            }

            if(error.message === 'Invalid Product ID format.'){
                return res.status(400).json({ message: error.message })
            }

            if(error.message === 'Client does not have a favorites list.'){
                return res.status(404).json({ message: error.message })
            }

            if(error.message === 'Unable to add a product that has not been registered.'){
                return res.status(409).json({ message: error.message })
            }

            if(error.message === 'Product is already in the favorites list.'){
                return res.status(409).json({ message: error.message })
            }

            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },

    async removeProductFavoriteList(req, res){
        try{
            const clientId = req.params.id
            const productId = req.body.productId

            const { error } = favoritesSchema.productIdSchema.validate(req.body)
            if(error){
                throw new Error('Product ID is required.')
            }

            const favoriteList = await favoriteService.removeProductFavoriteList(clientId, productId)
            return res.status(200).json(favoriteList)

        }catch (error){
            if(error.message === 'Client does not have a favorites list.'){
                return res.status(404).json({ message: error.message })
            }

            if(error.message === 'Product ID is required.'){
                return res.status(400).json({ message: error.message })
            }

            if(error.message === 'Product not found in favorites list.'){
                return res.status(404).json({ message: error.message })
            }

            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },

    async getFavoritesList(req, res){
        try{
            const clientId = req.params.id
            const favoriteList = await favoriteService.getFavoritesList(clientId)
            return res.status(200).json(favoriteList)
        }catch (error){
            if(error.message === 'Client ID is required.'){
                return res.status(400).json({ message: error.message })
            }

            if(error.message === 'Client does not have a favorites list.'){
                return res.status(404).json({ message: error.message })
            }

            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },

}