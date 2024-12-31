const authService = require('../services/authService')
const jwt = require('jsonwebtoken')
const envsConfig = require('../../../config/envsConfig')

const JWT_SECRET = envsConfig.JWT_SECRET

module.exports = {
    async verifyToken(req, res, next){
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({ message: 'Access denied.' })
        }
        try{
            const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
            req.client = decoded
            next()
        }catch (error) {
            return res.status(400).json({ message: 'Invalid Token.' })
        }
        
    }
}