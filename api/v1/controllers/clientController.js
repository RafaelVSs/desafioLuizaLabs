const clientService = require('../services/clientService')

module.exports = {
    async getclients(req, res) {
        try{
            const clients = await clientService.getClients()
            return res.status(200).json({clients}) 
            
        }catch (error){
            res.status(500).json({ message: 'Internal server error' })
        }
    },

    
}