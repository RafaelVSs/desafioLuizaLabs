const clientController = require('../../controllers/clientController')
const clientService = require('../../services/clientService')

jest.mock('../../services/clientService')

describe('Client Controller', () => {
    describe('getClients', () => {
        it('success get all clients, return 200', async () => {
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

        it('error get all clients, no clients found return 404', async () => {
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

        it('error get all clients, internal server error return 500', async () => {
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
        it('success get clients by id, return 200', async () => {
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

        it('Id is not registered, return 404', async () => {
            const req = { params: { id: 0 } }
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

        it('id was not passed, return 400', async () => {
            const req = { params: {} }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const error = { message: 'ID is required.' }
            clientService.getClientById.mockRejectedValue(error)
            await clientController.getClientById(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('Internal server error, return 500', async () => {
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
        it('success create client, return 201', async () => {
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

        it('there is no name or email on the body, return 400', async () => {
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

        it('client registered with this email, return 409', async () => {
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

        it('internal server error, return 500', async () => {
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
        it('success to update client, return 200', async () => {
            const req = {
                params: { id: 1 },
                body: {
                    name: 'teste'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const mockClient = {
                id: '1',
                name: 'teste',
                email: 'teste@gmail.com'
        }
        
        clientService.updateClient.mockResolvedValue(mockClient)

        await clientController.updateClient(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(mockClient)
        })

        it('id was not passed, return 400', async () => {
            const req = { 
                params: {},
                body: {
                    name: 'teste'
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const error = { message: 'ID is required.' }
            clientService.updateClient.mockRejectedValue(error)
            await clientController.updateClient(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('name or email was not passed, return 400', async () => {
            const req = { 
                params: { id: 1 },
                body: {
                }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const error = { message: 'Name or email must be provided for update.' }
            clientService.updateClient.mockRejectedValue(error)
            await clientController.updateClient(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('Id is not registered, return 404', async () => {
            const req = { 
                params: { id: 1 },
                body: {
                    name: 'teste',
                    email: 'teste@teste.com'
                } 
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const error = { message: 'Client not found or does not exist.' }
            clientService.updateClient.mockRejectedValue(error)
            await clientController.updateClient(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('internal server error, return 500', async () => {
            const req = { 
                params: { id: 1 },
                body: {
                    name: 'teste',
                    email: 'teste@teste.com'
                } 
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            clientService.updateClient.mockRejectedValue(new Error('Test error!'))
            await clientController.updateClient(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server Error. Test error!' })
        })
    })

    describe('deleteClient', () => {
        it('success to delete client, return 204', async () => {
            const req = { params: { id: 1 } }
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }
        
        clientService.deleteClient.mockResolvedValue()

        await clientController.deleteClient(req, res)

        expect(res.status).toHaveBeenCalledWith(204)
        expect(res.send).toHaveBeenCalled()
        })

        it('id was not passed, return 400', async () => {
            const req = { params: {} }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const error = { message: 'ID is required.' }
            clientService.deleteClient.mockRejectedValue(error)
            await clientController.deleteClient(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('client not found, return 404', async () => {
            const req = { params: { id: 0 } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            const error = { message: 'Client not found or does not exist.' }
            clientService.deleteClient.mockRejectedValue(error)
            await clientController.deleteClient(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('internal server error, return 500', async () => {
            const req = { params: { id: 1 } }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            clientService.deleteClient.mockRejectedValue(new Error('Test error!'))
            await clientController.deleteClient(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server Error. Test error!' })
        })
    })
})