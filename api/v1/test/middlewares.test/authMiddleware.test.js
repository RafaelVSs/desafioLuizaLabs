const jwt = require('jsonwebtoken')
const authMiddleware = require('../../middlewares/authMiddleware')
const envsConfig = require('../../../../config/envsConfig')

const JWT_SECRET = envsConfig.JWT_SECRET

describe('Verify Token', () => {
    it('return 401', async () => {
        const req = { headers: {} }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const next = jest.fn()

        await authMiddleware.verifyToken(req, res, next)

        expect(next).not.toHaveBeenCalledWith()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'Access denied.' })
    })

    it('return 400', async () => {
        const req = { headers: { authorization: 'invalid token.' } }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const next = jest.fn()

        await authMiddleware.verifyToken(req, res, next)

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Token.' })
    })

    it('return next()', async () => {
        const client = {
            id: '1',
            email: 'teste@teste.com',
            name: 'teste'
        }
        const token = jwt.sign(client, JWT_SECRET)
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const req = { headers: { authorization: `Bearer ${token}` } }
        const next = jest.fn()

        await authMiddleware.verifyToken(req, res, next)
        
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(req.client).toEqual(expect.objectContaining(client))
        expect(next).toHaveBeenCalled()
    })
})