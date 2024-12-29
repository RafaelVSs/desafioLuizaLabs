const clientRepository = require('../repositories/clientRepository')

module.exports = {
    async getClients(){
        try{
            return await clientRepository.findAll()
        }catch (error){
            throw new Error("Service error when searching for customers: " + error.message)
        }
    },

    async getClientById(id){
        try{
            return await clientRepository.findById(id)
        }catch (error){
            throw new Error('Service error when searching for customer: ' + error.message)
        }
    },

    async createClient(client){
        try{
            return await clientRepository.createClient(client)
        }catch (error){
            throw new Error('Service error when creating client: ' + error.message)
        }
    },

    async updateClient(id){
        try{
            return await clientRepository.findByIdAndUpdate(id)
        }catch (error){
            throw new Error('Service error when updating client: ' + error.message)
        }
    },

    async deleteClient(id){
        try{
            return await clientRepository.findByIdAndDelete(id)
        }catch (error){
            throw new Error('Service error when deleting client: ' + error.message)
        }
    }
}