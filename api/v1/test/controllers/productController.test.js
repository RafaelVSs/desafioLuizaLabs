const productController = require('../../controllers/productController')
const productService = require('../../services/productService')

jest.mock('../../services/productService')

describe('Product Controller', () => {
    describe('getProducts', () => {
        it('success get all products, return 200', async () => {
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const mockListProduct = [
                {
                    title: "Produto 1",
                    image: "base64_imagem_1",
                    price: 10.0
                },
                {
                    title: "Produto 2",
                    image: "base64_imagem_2",
                    price: 20.0
                }
            ]
            
            productService.getProducts.mockResolvedValue(mockListProduct)
    
            await productController.getProducts(req, res)
    
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockListProduct)
        })

        it('error get all products, no products found, return 404', async () => {
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            error = { message: 'No Products found.' }
            productService.getProducts.mockRejectedValue(error)

            await productController.getProducts(req, res)
    
            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('error get all products, internal server error, return 500', async () => {
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            
            productService.getProducts.mockRejectedValue(new Error('Test error!'))

            await productController.getProducts(req, res)
    
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server Error. Test error!' })
        })
    })

    describe('getProductsById', () => {
        it('success get product by id, return 200', async () => {
            const req = { params: { id: "1" } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const mockProduct = {
                    id: req.params.id,
                    title: "Produto 1",
                    image: "base64_imagem_1",
                    price: 10.0
            }
            
            productService.getProductById.mockResolvedValue(mockProduct)
    
            await productController.getProductById(req, res)
    
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(mockProduct)
        })

        it('id is not registered, return 404', async () => {
            const req = { params: { id: "0" } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            error = { message: 'Product not found or does not exist.' }
            productService.getProductById.mockRejectedValue(error)

            await productController.getProductById(req, res)
    
            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('error get product by id, internal server error, return 500', async () => {
            const req = { params: { id: "1" } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            
            productService.getProductById.mockRejectedValue(new Error('Test error!'))

            await productController.getProductById(req, res)
    
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server Error. Test error!' })
        })
    })

    describe('createProduct', () => {
        it('create product, return 201', async () => {
            const req = { 
                body: { 
                    title: "Produto 1",
                    image: "base64_imagem_1",
                    price: 10.0
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }        

            const mockProduct = {
                title: req.body.title,
                image: req.body.image,
                price: req.body.price
            }

            productService.createProduct.mockResolvedValue(mockProduct)

            await productController.createProduct(req, res)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith(mockProduct)
        })

        it('error create product, invalid body, return 400', async () => {
            const req = { body: {} }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const error = { message: 'Title, image and price are required.' }
            productService.createProduct.mockRejectedValue(error)
            await productController.createProduct(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('error create product, internal server error, return 500', async () => {
            const req = { 
                body: { 
                    title: "Produto 1",
                    image: "base64_imagem_1",
                    price: 10.0
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } 

            productService.createProduct.mockRejectedValue(new Error('Test error!'))

            await productController.createProduct(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server Error. Test error!' })
        })
    })

    describe('deleteProduct', () => {
        it('success delete product, return 204', async () => {
            const req = { params: { id: "1" } }
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }

            productService.deleteProduct.mockResolvedValue(req.params.id)
            await productController.deleteProduct(req, res)

            expect(res.status).toHaveBeenCalledWith(204)
            expect(res.send).toHaveBeenCalled()
        })

        it('error delete product,id not found return 404', async () => {
            const req = { params: { id: "0" } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const error = { message: 'Product not found or does not exist.' }

            productService.deleteProduct.mockRejectedValue(error)
            await productController.deleteProduct(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('error delete product, internal server error, return 500', async () => {
            const req = { params: { id: "1" } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            productService.deleteProduct.mockRejectedValue(new Error('Test error!'))

            await productController.deleteProduct(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server Error. Test error!' })
        })
    })
    
})