const productRepository = require('../repositories/productRepository')

module.exports = {
    async getProducts(){
        try{
            const listProducts = await productRepository.findAll()

            if(!listProducts || listProducts.length === 0){
                throw new Error('No Products found.' )
            }

            return listProducts
        }catch (error){
            throw error
        }
    },

    async getProductById(id){
        try{
            validateId(id)
            const product = await productRepository.findById(id)
            if(!product){
                throw new Error('Product not found or does not exist.')
            }
            const productFormated = {
                title: product.title,
                image: product.image,
                price: product.price
            }
            return productFormated
        }catch (error){
            throw error
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
            throw error
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
            throw error
        }
    }
    
}


function validateId(id){
    if(!id){
        throw new Error('ID is required.')
    }
}