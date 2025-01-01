const clientService = require('../services/clientService')

module.exports = {
    async getClients(req, res){
        try{
            const listClients = await clientService.getClients()
            if(!listClients || listClients.length === 0){
                return res.status(404).json({ message: 'No Clients found.' })
            }
            return res.status(200).json(listClients) 
        }catch (error){
            return res.status(500).json({ message: 'Internal server error' })
        }
    },

    async getClientById(req, res){
        try{
            const id = req.params.id
            const client = await clientService.getClientById(id)
            return res.status(200).json(client)
        }catch (error){
            if(error.message === 'Client not found or does not exist: '){
                return res.status(404).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Internal server error' })
        }
    },
    
    async createClient(req, res){
        try{
            const { email, name } = req.body
            const newClient = await clientService.createClient(name, email)
            const newClientFormated = {
                id: newClient.id,
                name: newClient.name,
                email: newClient.email,
                createdAt: newClient.createdAt
            }
            return res.status(201).json(newClientFormated)
        }catch (error){
            if(error.message === 'Name and email are required.'){
                return res.status(400).json({ message: error.message })
            }

            if(error.message === 'There is already a client registered with this email.'){
                return res.status(409).json({ message: error.message })
            }

            return res.status(500).json({ message: 'Internal server error' })
            
        }
    },

    async updateClient(req, res){
        try{
            const id = req.params.id
            const data = req.body
            const updatedClient = await clientService.updateClient(id, data)
            const clientFormated = {
                id: updatedClient.id,
                name: updatedClient.name,
                email: updatedClient.email
            }
            return res.status(200).json(clientFormated)
        }catch (error){
            if(error.message === 'Client not found or does not exist.'){
                return res.status(404).json({ message: error.message })
            }

            if(error.message === 'Name or email must be provided for update.'){
                return res.status(409).json({ message: error.message })
            }

            return res.status(500).json({ message: error.message })
        }
    },

    async deleteClient(req, res){
        try{
            const id = req.params.id
            await clientService.deleteClient(id)
            return res.status(204).send()
        }catch (error){
            if(error.message === 'Client not found or does not exist.'){
                return res.status(404).json({ message: error.message })
            }
            return res.status(500).json({ message: error.message })
        }
    }
}