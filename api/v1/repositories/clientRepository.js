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

    async findByIdAndUpdate(id){
        try{
            return await Client.findByIdAndUpdate(id)
        }catch (error){
            throw new Error('Error updating client: ' + error.message)
        }
    },

    async findByIdAndDelete(id){
        try{
            await Client.findByIdAndDelete(id)
        }catch (error){
            throw new Error('Error deleting client: ' + error.message)
        }
    }
}