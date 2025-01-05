const jwt = require('jsonwebtoken')
const envsConfig = require('../../../config/envsConfig')
const clientRepository = require('../repositories/clientRepository')

const JWT_SECRET = envsConfig.JWT_SECRET

module.exports = {
    async login(email){
        try{
            const client = await clientRepository.findOneEmail(email)
            if(!client){
                throw new Error('Client not found or does not exist.')
            }

            const token = jwt.sign(
                {
                        id: client._id,
                        email: client.email,
                        name: client.name
                }, JWT_SECRET, { expiresIn: '1h'}
            )
            const payload = jwt.decode(token)
            const payloadFormated = {
                id: payload.id,
                email: payload.email,
                name: payload.name
            }

            const clientFormated = {token, payloadFormated}
            return clientFormated
            
        }catch (error){
            throw error
        }
    }
}    