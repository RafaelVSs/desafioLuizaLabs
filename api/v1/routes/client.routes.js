const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clientController')
const validateRequest = require('../middlewares/validateRequest')
const authMiddlewares = require('../middlewares/authMiddlewares')

router.get('/', authMiddlewares.verifyToken, clientController.getClients)
router.get('/:id', validateRequest.validateId, clientController.getClientById)
router.post('/', clientController.createClient)
router.patch('/:id', validateRequest.validateId, clientController.updateClient)
router.delete('/:id', validateRequest.validateId, clientController.deleteClient)

module.exports = router