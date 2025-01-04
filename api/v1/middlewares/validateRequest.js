const mongoose = require('mongoose')
const productController = require('../controllers/productController')
const favoriteController = require('../controllers/favoriteController')

module.exports = {
    async validateIdMongo(req, res, next){
        try{
            const id = req.params.id
            if (!mongoose.isValidObjectId(id)){
                return res.status(400).json({ message: 'Invalid ID format' })
            }

            next()
        }catch (error){
            next(error)
        }
    },

    async validateExistingFavoritesList(req, res, next){
        try{
            const existingFavoritesList = await favoriteController.getFavoritesList(req.params.id)
            if(existingFavoritesList){
                return res.status(409).json({ message: 'Client already has a favorites list.' })
            }
            
            next()
        }catch (error){
            next(error)
        }
    }    
}