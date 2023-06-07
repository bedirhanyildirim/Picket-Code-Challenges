import request from 'supertest'
import app from '../app'

describe('User Controller', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request(app)
        .get('/users')
        .set('API_KEY', 'picket')
      expect(response.status).toBe(200)
      expect(response.body).toHaveLength(1)
    })
  })
})