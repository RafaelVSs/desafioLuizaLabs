const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Returns the client authentication token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Rafael"
 *               email:
 *                 type: string
 *                 example: "rafael@gmail.com"
 *     responses:
 *       200:
 *         description: Client authentication token. 
 *         content:
 *           application/json:
 *             schema:
 *               type: object   
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI2qYaDM2wFM8-qVJlJziU..."
 *       400:
 *         description: Invalid credencials.
 *       401:
 *         description: Unauthorized, invalid credentials.
 *       404:
 *         description: Client not found or not registered.     
 */ 
router.post('/', authController.login)

module.exports = router