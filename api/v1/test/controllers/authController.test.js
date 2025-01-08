const authController = require('../../controllers/authController')
const authService = require('../../services/authService')

jest.mock('../../services/authService')

describe('Login', () => {
    it('return 400', async() => {
        const req = { body: {} }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const error = { message: 'Email is required.'}
        authService.login.mockRejectedValue(error)
        await authController.login(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith(error)
    })

    it('return 401', async () => {
        const req = { body: { email: "test@test.com" } }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const error = { message: 'Unauthorized, invalid credentials.' }
        authService.login.mockRejectedValue(error)
        await authController.login(req, res)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith(error)
    })

    it('return 200', async () => {
        const req = { body: { email: "test@test.com" } }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const mockClient = {
            body: {
                toke: 'testeToken',
                payloadFormated: {
                    id: 1,
                    email: "test@test.com",
                    name: "teste"
                }
            }
        }
        authService.login.mockResolvedValue(mockClient)

        await authController.login(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(mockClient)
    })

    it('return 500', async () => {
        const req = { body: { email: "test@test.com" } }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const error = new Error('teste error')
        authService.login.mockRejectedValue(error)

        await authController.login(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: error.message })
    })
})