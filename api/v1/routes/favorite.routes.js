const express = require('express')
const favoriteController = require('../controllers/favoriteController')
const validateRequest = require('../middlewares/validateRequest')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/:id', validateRequest.validateIdMongo, authMiddleware.verifyToken, favoriteController.getFavoritesList)
router.post('/:id', validateRequest.validateIdMongo, authMiddleware.verifyToken, favoriteController.createFavoriteList)
router.patch('/:id', validateRequest.validateIdMongo, authMiddleware.verifyToken, favoriteController.addProductFavoriteList)
router.patch('/remove/:id', validateRequest.validateIdMongo, authMiddleware.verifyToken, favoriteController.removeProductFavoriteList)

module.exports = router