import request from 'supertest'
import app from '../app.js'

describe('Auth Middleware', () => {
  describe('apiKeyAuth', () => {
    it('should return a 401 status if API key is missing', async () => {
      const response = await request(app)
        .get('/users')
        .set('API_KEY', '')

      expect(response.status).toBe(401)
      expect(response.body).toEqual({ message: 'Unauthorized' })
    })
    it('should return a 401 status if API key is incorrect', async () => {
      const response = await request(app)
        .get('/users')
        .set('API_KEY', 'incorrect_key')

      expect(response.status).toBe(401)
      expect(response.body).toEqual({ message: 'Unauthorized' })
    })
    it('should return a 200 status if API key is correct', async () => {
      const response = await request(app)
        .get('/users')
        .set('API_KEY', process.env.API_KEY)

      expect(response.status).toBe(200)
    })
  })
})
