const clientRepository = require('../repositories/clientRepository')

module.exports = {
    async getClients(){
        try{
            const listClients = await clientRepository.findAll()
            if(!listClients || listClients.length === 0){
                throw new Error('No clients found.') 
            }
            return listClients
        }catch (error){
            throw error
        }
    },

    async getClientById(id){
        try{
            validateId(id)
            const client = await clientRepository.findById(id)
            if(!client){
                throw new Error('Client not found or does not exist.')
            } 
            return client
        }catch (error){
            throw error
        }
    },

    async createClient(name, email){
        try{
            if (!name || !email){
                throw new Error('Name and email is required.')
            }
            const existingClient = await clientRepository.findOneEmail({email})
            if(existingClient){
                throw new Error('There is already a client registered with this email.')
            }
            const client = { name, email }
            const newClient = await clientRepository.createClient(client)
            const newClientFormated = {
                id: newClient.id,
                name: newClient.name,
                email: newClient.email,
                createdAt: newClient.createdAt
            } 
            return newClientFormated
        }catch (error){
            throw error
        }
    },

    async updateClient(id, data){
        try{
            validateId(id)
            const existingClient = await this.getClientById(id)
            if(!existingClient){
                throw new Error('Client not found or does not exist.')
            }
            if(!data.email && !data.name){
                throw new Error('Name or email must be provided for update.')
            }
            const updatedClient = await clientRepository.findByIdAndUpdate(id, data)
            const clientFormated = {
                id: updatedClient.id,
                name: updatedClient.name,
                email: updatedClient.email
            }
            return clientFormated
        }catch (error){
            throw new Error(error.message)
        }
    },

    async deleteClient(id){
        try{
            validateId(id)
            const existingClient = await this.getClientById(id)
            if(!existingClient){
                throw new Error('Client not found or does not exist.')
            }
            return await clientRepository.findByIdAndDelete(id)
        }catch (error){
            throw new Error(error.message)
        }
    }
}

function validateId(id){
    if(!id){
        throw new Error('ID is required.')
    }
}