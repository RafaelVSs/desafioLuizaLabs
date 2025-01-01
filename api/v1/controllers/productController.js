const productService = require('../services/productService')

module.exports = {
    async getProducts(req, res){
        try{
            const listProducts = await productService.getProducts()
            if(!listProducts || listProducts.length === 0){
                return res.status(404).json({ message: 'No Products found.' })
            }
            return res.status(200).json(listProducts)
        }catch (error){
            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },

    async getProductById(req, res){
        try{
            const id = req.params.id
            const product = await productService.getProductById(id)
            const productFormated = {
                title: product.title,
                image: product.image,
                price: product.price
            }
            return res.status(200).json(productFormated)
        }catch (error){
            if(error.message === 'ID are required.'){
                return res.status(400)
            }
            if(error.message === 'Product not found or does not exist.'){
                return res.status(404).json({ message: error.message })
            }
            return res.status(500).json({ message: error.message })
        }
    },

    async createProduct(req, res){
        try{
            const { title, image, price } = req.body
            const newProduct = await productService.createProduct(title, image, price)
            return res.status(201).json(newProduct)
        }catch (error){
            if(error.message === 'Title, image and price are required.'){
                return res.status(400).json({ message: error.message })
            }
            return res.status(500).json({ message: error.message })
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
            return res.status(500).json({ message: error.message })
        }
    }
}