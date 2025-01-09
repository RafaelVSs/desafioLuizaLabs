const Joi = require('joi')

const createClientSchema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required()
})

const editClientSchema = Joi.object({
    email: Joi.string().email().optional(),
    name: Joi.string().optional()
}).or('email', 'name')

module.exports = { createClientSchema, editClientSchema }