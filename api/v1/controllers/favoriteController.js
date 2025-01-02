const favoriteService = require('../services/favoriteService')

module.exports = {
    async createFavoriteList(req, res){
        try{
            const clientId = req.params.id
            const favoriteList = rep.body
            const newFavoriteList = await favoriteService.createFavoriteList(clientId, favoriteList)
            return res.status(201).json(newFavoriteList)
        }catch (error){
            if(error.message === 'ID and favorite list are required.'){
                return res.status(400).json({ message: error.message })
            }
            if(error.message === 'This client already has a favorites list.'){
                return res.status(409).json({ message: error.message })
            }
            return res.status(500).json({ message: error.message })
        }
    },

    async addProductFavoriteList(req, res){
        try{
            const clientId = req.params.id
            const productId = req.body
            if(!clientId || !productId){
                res.status(400).json({ message: 'Client and Product ID id required.' })
            }
            const FavoriteList = await favoriteService.addProductFavoriteList(clientId, productId)
            res.status(200).json(FavoriteList)
        }catch (error){
            if(error.message === 'Client does not have a favorites list.'){
                res.status(404).json({ message: error.message })
            }
            if(error.message ==='Product is already in the favorites list.'){
                res.status(409).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        }
    },

    async removeProductFavoriteList(req, res){
        try{
            const clientId = req.params.id
            const productId = req.body
            if(!clientId || !productId){
                res.status(400).json({ message: 'Client and Product ID id required.' })
            }
            const favoriteList = await favoriteService.removeProductFavoriteList(clientId, productId)
            res.status(200).json(favoriteList)
        }catch (error){
            if(error.message === 'Client does not have a favorites list.'){
                res.status(404).json({ message: error.message })
            }
            if(error.message === 'Product not found in favorites list.'){
                res.status(404).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        }
    },

    async getFavoritesList(req, res){
        try{
            const clientId = req.params.id
            if(!clientId){
                res.status(400).json({ message: 'Client ID is reqiured.' })
            }
            const favoriteList = await favoriteService.getFavoritesList(clientId)
            res.status(200).json(favoriteList)
        }catch (error){
            res.status(500).json({ message: error.message })
        }
    }

}