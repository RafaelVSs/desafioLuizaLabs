const productService = require('../services/productService')
const productSchema = require('../schemas/productSchema')

module.exports = {
    async getProducts(req, res){
        try{
            const listProducts = await productService.getProducts()
            return res.status(200).json(listProducts)
        }catch (error){
            if(error.message === 'No Products found.'){
                return res.status(404).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },

    async getProductById(req, res){
        try{
            const id = req.params.id   
            const product = await productService.getProductById(id)
            return res.status(200).json(product)
        }catch (error){
            if(error.message === 'Product not found or does not exist.'){
                return res.status(404).json({ message: error.message })
            }

            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },

    async createProduct(req, res){
        try{
            const { title, image, price } = req.body
            const { error } = productSchema.createProductSchema.validate(req.body)
            if(error){
                throw new Error('Title, image and price are required.')
            }    
            const newProduct = await productService.createProduct(title, image, price)

            return res.status(201).json(newProduct)
        }catch (error){
            if(error.message === 'Title, image and price are required.'){
                return res.status(400).json({ message: error.message })
            }

            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },

    async deleteProduct(req, res){
        try{
            const id = req.params.id

            await productService.deleteProduct(id)

            return res.status(204).send()
        }catch (error){
            if(error.message === 'Product not found or does not exist.'){
                return res.status(404).json({ message: error.message })
            }
            
            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    }
}