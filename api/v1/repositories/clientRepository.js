const Client = require('../models/Client')

module.exports = {

    async findAll(){
        try{
            return await Client.find()
        }catch (error){
            throw error
        }
    },

    async findById(id){
        try{
            return await Client.findById(id)
        }catch (error){
            throw error
        }
    },

    async findByIdAndUpdate(id, clientData){
        try{
            const updatedClient = await Client.findByIdAndUpdate(id, clientData, { new: true}) 
            return updatedClient
        }catch (error){
            throw error
        }
    },

    async findByIdAndDelete(id){
        try{
            return await Client.findByIdAndDelete(id)
        }catch (error){
            throw error
        }
    },

    async findOneEmail(email){
        try{
            const client = await Client.findOne(email)
            return client
        }catch (error){
            throw error
        }
    },

    async createClient(client){
        try{
            const newClient = new Client(client)
            return await newClient.save()
        }catch (error){
            throw error
        }
    },

}