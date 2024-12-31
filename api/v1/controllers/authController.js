const authService = require('../services/authService')

module.exports = {
    async login(req, res){
        try{
            const token = await authService.login(req.body)
            return res.status(200).json({ token: token })
        }catch (error){
            if(error.message === 'Client not found or does not exist: '){
                return res.status(404).json({ message: error.message })
            }

            return res.status(500).json({ message: error.message })
        }
    }
}