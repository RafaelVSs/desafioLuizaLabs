const mongoose = require('mongoose')
const productController = require('../controllers/productController')

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

    async validateExistingProduct(req, res, next){
        try{
            const existingProduct = productController.getProductById(req.params.id)
            if(!existingProduct){
                res.status(404).json({ message: 'Product not found.' })
            }
            next()
        }catch (error){
            next(error)
        }

    }
}