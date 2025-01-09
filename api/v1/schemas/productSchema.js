const Joi = require('joi')

const createProductSchema = Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        price: Joi.number().required(),
})


module.exports = { createProductSchema }