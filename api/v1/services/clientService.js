const clientRepository = require('../repositories/clientRepository')

module.exports = {
    async getClients(){
        try{
            return await clientRepository.findAll()
        }catch (error){
            throw new Error("No clients found: " + error.message)
        }
    },

    async getClientById(id){
        try{
            return await clientRepository.findById(id)
        }catch (error){
            throw new Error('Client not found or does not exist: ' + error.message)
        }
    },

    async createClient(name, email){
        try{
            if (!name || !email){
                throw new Error('Name and email are required.')
            }
            const existingClient = await clientRepository.findOneEmail({email})
            if(existingClient){
                throw new Error('There is already a client registered with this email.')
            }

            const client = { name, email } 
            return await clientRepository.createClient(client)
        }catch (error){
            throw new Error(error.message)
        }
    },

    async updateClient(id, data){
        try{
            const existingClient = await this.getClientById(id)
            if(!existingClient){
                throw new Error('Client not found or does not exist.')
            }

            if(!data.email && !data.name){
                throw new Error('Name or email must be provided for update.')
            }
            return await clientRepository.findByIdAndUpdate(id, data)
        }catch (error){
            throw new Error(error.message)
        }
    },

    async deleteClient(id){
        try{
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