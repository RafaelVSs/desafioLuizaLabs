const productRepository = require('../repositories/productRepository')

module.exports = {
    async getProducts(){
        try{
            return await productRepository.findAll()
        }catch (error){
            throw new Error('No products found: ' + error.message)
        }
    },

    async getProductById(id){
        try{
            if(!id){
                throw new Error('ID are required.')
            }
            return await productRepository.findById(id)
        }catch (error){
            throw new Error('Product not ofund or does not exist: ' + error.message)
        }
    },

    async createProduct(title, image, price){
        try{
            if(!title || !image || !price){
                throw new Error('Title, image and price are required.')
            }
            const product = { title, image, price }
            return await productRepository.createProduct(product)
        }catch (error){
            throw new Error(error.message)
        }
    },

    async deleteProduct(id){
        try{
            validateId(id)
            const existingProduct = await this.getProductsById(id)
            if(!existingProduct){
                throw new Error('Product not found or does not exist.')
            }
            return await productRepository.findByIdAndDelete(id)
        }catch (error){
            throw new Error(error.message)
        }
    }
    
}


function validateId(id){
    if(!id){
        throw new Error('ID is required.')
    }
}