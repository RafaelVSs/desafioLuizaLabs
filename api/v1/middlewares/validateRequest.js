const mongoose = require('mongoose')

module.exports = {
    async validateId(req, res, next){
        const id = req.params.id
        
        if (!mongoose.isValidObjectId(id)){
            return res.status(400).json({message: 'Invalid ID format'})
        }
        next()
    },

    
}