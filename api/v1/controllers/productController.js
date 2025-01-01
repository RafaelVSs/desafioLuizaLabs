const productService = require('../services/productService')

module.exports = {
    async getProduct(req, res){
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
        }
    }
}