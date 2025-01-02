const Client = require('../models/Client')

module.exports = {

    async findAll(){
        try{
            return await Client.find()
        }catch (error){
            throw new Error('Error searching for customers: ' + error.message)
        }
    },

    async findById(id){
        try{
            return await Client.findById(id)
        }catch (error){
            throw new Error('Error searching for client: ' + error.message)
        }
    },

    async findByIdAndUpdate(id, clientData){
        try{
            const updatedClient = await Client.findByIdAndUpdate(id, clientData, { new: true}) 
            return updatedClient
        }catch (error){
            throw new Error('Error updating client: ' + error.message)
        }
    },

    async findByIdAndDelete(id){
        try{
            return await Client.findByIdAndDelete(id)
        }catch (error){
            throw new Error('Error deleting client: ' + error.message)
        }
    },

    async findOneEmail(email){
        try{
            const client = await Client.findOne(email)
            return client
        }catch (error){
            throw new Error('Error searching for client by email: ' + error.message)
        }
    },

    async createClient(client){
        try{
            const newClient = new Client(client)
            return await newClient.save()
        }catch (error){
            throw new Error('Error creating client: ' + error.message)
        }
    },

}