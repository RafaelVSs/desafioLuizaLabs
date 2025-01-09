const authService = require('../services/authService')
const authSchema = require('../schemas/authSchema')

module.exports = {
    async login(req, res){
        try{
            const { email } = req.body
            const { error } = authSchema.loginSchema.validate(req.body)
            if(error){
                throw new Error('Format invalid email')
            }
            const authenticatedClient = await authService.login(email)
            return res.status(200).json(authenticatedClient)
        }catch (error){
            if(error.message === 'Format invalid email'){
                return res.status(400).json({ message: error.message })
            }
            if(error.message === 'Unauthorized, invalid credentials.'){
                return res.status(401).json({ message: error.message })
            }
            return res.status(500).json({ message: error.message })
        }
    }
}
