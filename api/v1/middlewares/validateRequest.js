const mongoose = require('mongoose')

module.exports = {
    async validateIdMongo(req, res, next){
        try{
            const id = req.params.id
            if (!id){
                return res.status(400).json({message: 'Id is required.'})
            }
            if (!mongoose.isValidObjectId(id)){
                return res.status(400).json({ message: 'Invalid ID format.' })
            }
    
            next()
        }catch (error){
            next(error)
        }
    }
}