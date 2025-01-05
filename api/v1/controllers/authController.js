const authService = require('../services/authService')

module.exports = {
    async login(req, res){
        try{
            if(!req.body.email){
                return res.status(400).json({ message: 'Email is required.' })
            }
            
            const authenticatedClient = await authService.login(req.body)
            if(!authenticatedClient){
                return res.status(401).json({ message: 'Unauthorized, invalid credentials.' })
            }

            return res.status(200).json(authenticatedClient)
        }catch (error){
            if(error.message === 'Client not found or does not exist.'){
                return res.status(404).json({ message: error.message })
            }

            return res.status(500).json({ message: error.message })
        }
    }
}