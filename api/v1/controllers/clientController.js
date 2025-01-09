const clientService = require('../services/clientService')
const clientSchema = require('../schemas/clientSchema')

module.exports = {
    async getClients(req, res){
        try{
            const listClients = await clientService.getClients()
            
            return res.status(200).json(listClients) 
        }catch (error){
            if(error.message === 'No clients found.'){
                return res.status(404).json({ message: error.message }) 
            }
            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },

    async getClientById(req, res){
        try{
            const id = req.params.id
            const client = await clientService.getClientById(id)
            return res.status(200).json(client)
        }catch (error){
            if(error.message === 'ID is required.'){
                return res.status(400).json({ message: error.message })
            }
            if(error.message === 'Client not found or does not exist.'){
                return res.status(404).json({ message: error.message })
            }
            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    },
    
    async createClient(req, res){
        try{
            const { email, name } = req.body
            const { error } = await clientSchema.createClientSchema.validate(req.body)
            if(error){
                throw new Error('Name and email is required.')
            }
            const newClient = await clientService.createClient(name, email)
            
            return res.status(201).json(newClient)
        }catch (error){
            if(error.message === 'Name and email is required.'){
                return res.status(400).json({ message: error.message })
            }

            if(error.message === 'There is already a client registered with this email.'){
                return res.status(409).json({ message: error.message })
            }

            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
            
        }
    },

    async updateClient(req, res){
        try{
            const id = req.params.id
            const data = req.body

            const { error } = clientSchema.editClientSchema.validate(req.body)
            if(error){
                throw new Error('Name or email must be provided for update.')
            }

            const updatedClient = await clientService.updateClient(id, data)
            
            return res.status(200).json(updatedClient)
        }catch (error){
            if(error.message === 'ID is required.'){
                return res.status(400).json({ message: error.message })
            }
            if(error.message === 'Client not found or does not exist.'){
                return res.status(404).json({ message: error.message })
            }

            if(error.message === 'Name or email must be provided for update.'){
                return res.status(400).json({ message: error.message })
            }

            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
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

            if(error.message === 'ID is required.'){
                return res.status(400).json({ message: error.message })
            }

            return res.status(500).json({ message: 'Internal server Error. ' + error.message })
        }
    }
}