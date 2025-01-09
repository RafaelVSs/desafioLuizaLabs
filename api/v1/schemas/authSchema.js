const Joi = require('joi')

const loginSchema = Joi.object({
        email: Joi.string().email().required()
})

module.exports = {
    loginSchema
}