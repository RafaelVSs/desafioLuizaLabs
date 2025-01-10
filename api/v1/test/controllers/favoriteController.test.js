const favoriteController = require('../../controllers/favoriteController')
const favoriteService = require('../../services/favoriteService')

jest.mock('../../services/favoriteService')

describe('Favorites Controller', () => {
    describe('createFavoriteList', () => {
        it('success create favoriteslist, return 201', async () => {
            const req = {
                params: { id: '1' }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const mockFavoritesList = {
                _id: '2',
                id_client: '1',
                favorit_list: []
            }

            favoriteService.createFavoriteList.mockResolvedValue(mockFavoritesList)

            await favoriteController.createFavoriteList(req, res)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith(mockFavoritesList)
        })

        it('conflit client has a favorites list, return 409', async () => {
            const req = {
                params: { id: '1' }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            const error = { message: 'This client already has a favorites list.' }

            favoriteService.createFavoriteList.mockRejectedValue(error)

            await favoriteController.createFavoriteList(req, res)

            expect(res.status).toHaveBeenCalledWith(409)
            expect(res.json).toHaveBeenCalledWith(error)
        })

        it('error create favoriteslist, internal server error return 500', async () => {
            const req = {
                params: { id: '1' }
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            favoriteService.createFavoriteList.mockRejectedValue(new Error('Test error!'))

            await favoriteController.createFavoriteList(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server Error. Test error!' })
        })
    })
})