const Product = require('../models/Product')

module.exports = {
    async findAll(){
        try{
            return await Product.find()
        }catch (error){
            throw new Error('Error searching for products: ' + error.messsage)
        }
    },

    async findById(id){
        try{
            return await Product.findById(id)
        }catch (error){
            throw new Error('Error searching for product: ' + error.message)
        }
    },

    async createProduct(product){
        try{
            const newProduct = new Product(product)
            return await newProduct.save()
        }catch (error){
            throw new Error('Error creating product: ' + error.message)
        }
    },

    async findByIdAndDelete(id){
        try{
            return await Product.findByIdAndDelete(id)
        }catch (error){
            throw new Error('Error deleting product: ' + error.message)
        }
    },
}