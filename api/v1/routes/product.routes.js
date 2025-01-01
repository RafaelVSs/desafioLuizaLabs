const express = require('express')
const productController = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const validateRequst = require('../middlewares/validateRequest')

const router = express.Router()

router.get('/', authMiddleware.verifyToken, productController.getProducts)
router.get('/:id', authMiddleware.verifyToken, validateRequst.validateIdMongo, productController.getProductById)
router.post('/', productController.createProduct)
router.delete('/:id', validateRequst.validateIdMongo , productController.deleteProduct)


module.exports = router

