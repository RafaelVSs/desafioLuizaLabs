const clientController = require('../../controllers/clientController')
const clientService = require('../../services/clientService')

jest.mock('../../services/clientService')

describe('Cliente Controller', () => {
    describe('getClients', () => {
        it('return 200', async () => {
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const listClients = [
                {
                    id: '1',
                    name: 'teste',
                    email: 'teste@gmail.com'
                },
                {
                    id: '1',
                    name: 'teste',
                    email: 'teste@gmail.com'
                }
            ]
            clientService.getClients.mockResolvedValue(listClients)

            await clientController.getClients(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(listClients)
        })

        it('return 404', async () => {
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const error = { message: 'No clients found.' }
            clientService.getClients.mockRejectedValue(error)
            await clientController.getClients(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('return 500', async () => {
            const req = {}
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            clientService.getClients.mockRejectedValue(new Error('Test error!'))
            await clientController.getClients(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server Error. Test error!' })
        })
    })

    describe('getClientsById', () => {
        it('return 200', async () => {
            const req = { params: { id: '1' } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const client = {
                    id: '1',
                    name: 'teste',
                    email: 'teste@gmail.com'
            }

            
            clientService.getClientById.mockResolvedValue(client)

            await clientController.getClientById(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(client)
        })

        it('return 404', async () => {
            const req = { params: { } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const error = { message: 'Client not found or does not exist.' }
            clientService.getClientById.mockRejectedValue(error)
            await clientController.getClientById(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('return 500', async () => {
            const req = { params: { id: '1' } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            clientService.getClientById.mockRejectedValue(new Error('Test error!'))
            await clientController.getClientById(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server Error. Test error!' })
        })
    })

    describe('createClient', () => {
        it('return 201', async () => {
            const req = { body: { name: 'teste', email: 'teste@teste.com' } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const mockClient = {
                    id: '1',
                    name: 'teste',
                    email: 'teste@gmail.com'
            }
    
            
            clientService.createClient.mockResolvedValue(mockClient)
    
            await clientController.createClient(req, res)
    
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith(mockClient)
        })

        it('return 400', async () => {
            const req = { body: { } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const error = { message: 'Name and email is required.' }
            clientService.createClient.mockRejectedValue(error)
            await clientController.createClient(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('return 409', async () => {
            const req = { body: { name: 'teste', email: "teste@teste.com" } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const error = { message: 'There is already a client registered with this email.' }
            clientService.createClient.mockRejectedValue(error)
            await clientController.createClient(req, res)

            expect(res.status).toHaveBeenCalledWith(409)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('return 500', async () => {
            const req = { body: { name: 'teste', email: "teste@teste.com" } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            clientService.createClient.mockRejectedValue(new Error('Test error!'))
            await clientController.createClient(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server Error. Test error!' })
        })
    })

    describe('updateClient', () => {
        
    })

    describe('deleteClient', () => {
        
    })
})