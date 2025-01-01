const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clientController')
const validateRequest = require('../middlewares/validateRequest')
const authMiddlewares = require('../middlewares/authMiddlewares')

router.get('/', authMiddlewares.verifyToken, clientController.getClients)
router.get('/:id', validateRequest.validateIdMongo, clientController.getClientById)
router.post('/', clientController.createClient)
router.patch('/:id', validateRequest.validateIdMongo, clientController.updateClient)
router.delete('/:id', validateRequest.validateIdMongo, clientController.deleteClient)

module.exports = router