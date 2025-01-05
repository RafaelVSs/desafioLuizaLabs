const favoriteService = require('../services/favoriteService')
const mongoose = require('mongoose')

module.exports = {
    async createFavoriteList(req, res){
        try{
            const clientId = req.params.id
            if(!clientId){
                return res.status(400).json({ message: 'Client ID is required.' })
            }

            const newFavoriteList = await favoriteService.createFavoriteList(clientId)
            return res.status(201).json(newFavoriteList)

        }catch (error){
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
            if(!clientId || !productId){
                return res.status(400).json({ message: 'Client and Product ID id are required.' })
            }
            if (!mongoose.isValidObjectId(productId)){
                return res.status(400).json({ message: 'Invalid Product ID format.' })
            }

            const FavoriteList = await favoriteService.addProductFavoriteList(clientId, productId)
            return res.status(200).json(FavoriteList)

        }catch (error){
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
            if(!clientId || !productId){
                return res.status(400).json({ message: 'Client and Product ID id are required.' })
            }

            const favoriteList = await favoriteService.removeProductFavoriteList(clientId, productId)
            return res.status(200).json(favoriteList)

        }catch (error){
            if(error.message === 'Client does not have a favorites list.'){
                return res.status(404).json({ message: error.message })
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
            if(!clientId){
                return res.status(400).json({ message: 'Client ID is reqiured.' })
            }

            const favoriteList = await favoriteService.getFavoritesList(clientId)
            if(!favoriteList){
                return res.status(404).json({ message: 'Client does not have a favorites list.' })
            }

            return res.status(200).json(favoriteList)

        }catch (error){
            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },

}