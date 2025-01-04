const express = require('express')
const clientController = require('../controllers/clientController')
const validateRequest = require('../middlewares/validateRequest')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', authMiddleware.verifyToken, clientController.getClients)
router.get('/:id', authMiddleware.verifyToken, validateRequest.validateIdMongo, clientController.getClientById)
router.post('/', clientController.createClient)
router.patch('/:id', authMiddleware.verifyToken, validateRequest.validateIdMongo, clientController.updateClient)
router.delete('/:id', authMiddleware.verifyToken, validateRequest.validateIdMongo, clientController.deleteClient)

module.exports = router