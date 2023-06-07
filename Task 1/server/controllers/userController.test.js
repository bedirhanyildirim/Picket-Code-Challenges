import request from 'supertest'
import app from '../app.js'
import User from '../models/User.js'
import { jest } from '@jest/globals'
import fs from 'fs'

describe('User Controller', () => {

  let mockedReadFileSync
  let mockedWriteFileSync

  const mockUsers = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '123456789',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '987654321',
    },
  ]

  beforeEach(() => {
    mockedReadFileSync = jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockUsers))
    mockedWriteFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => { })
  })

  afterEach(() => {
    mockedReadFileSync.mockRestore()
    mockedWriteFileSync.mockRestore()
  })

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request(app)
        .get('/users')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(200)
    })
  })

  describe('GET /users/byId/:id', () => {
    it('should return a 200 status if the user is found', async () => {
      jest.spyOn(User, 'getUserById').mockReturnValue({ id: '1', firstName: 'John', lastName: 'Doe' })
      const response = await request(app)
        .get('/users/byId/1')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(200)
    })

    it('should return a 400 status if the user is not found', async () => {
      jest.spyOn(User, 'getUserById').mockImplementation(() => {
        throw new Error('User not found')
      })
      const response = await request(app)
        .get('/users/byId/99')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(400)
    })
  })

  describe('POST /users', () => {
    it('should return a 201 status if the user is created successfully', async () => {
      jest.spyOn(User, 'createUser').mockReturnValue({
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        phone: '555555555',
      })
      const response = await request(app)
        .post('/users')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(201)
    })

    it('should return a 400 status if there is an error creating the user', async () => {
      jest.spyOn(User, 'createUser').mockImplementation(() => {
        throw new Error('Error creating user')
      })
      const response = await request(app)
        .post('/users')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(400)
    })
  })

  describe('PUT /users/:id', () => {
    it('should return a 200 status if the user is updated successfully', async () => {
      jest.spyOn(User, 'updateUser').mockReturnValue({
        id: '1',
        firstName: 'John',
        lastName: 'Smith'
      })
      const response = await request(app)
        .put('/users/1')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(200)
    })

    it('should return a 400 status if the user is not found', async () => {
      jest.spyOn(User, 'updateUser').mockImplementation(() => {
        throw new Error('User not found')
      })
      const response = await request(app)
        .put('/users/2')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(400)
    })

    it('should return a 400 status if there is an error updating the user', async () => {
      jest.spyOn(User, 'updateUser').mockImplementation(() => {
        throw new Error('Error updating user')
      })
      const response = await request(app)
        .put('/users/1')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(400)
    })
  })

  describe('DELETE /users/:id', () => {
    it('should return a 200 status if the user is deleted successfully', async () => {
      jest.spyOn(User, 'deleteUser').mockReturnValue({
        id: '1',
        firstName: 'John',
        lastName: 'Doe'
      })
      const response = await request(app)
        .delete('/users/1')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(200)
    })

    it('should return a 400 status if the user is not found', async () => {
      jest.spyOn(User, 'deleteUser').mockImplementation(() => {
        throw new Error('User not found')
      })
      const response = await request(app)
        .delete('/users/2')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(400)
    })
  })

  describe('GET /users/search', () => {
    it('should return a 200 status', async () => {
      const response = await request(app)
        .get('/users/search?firstName=John')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(200)
    })
    it('should return a 400 status if there is no such user', async () => {
      const response = await request(app)
        .get('/users/search?firstName=Bedirhan')
        .set('API_KEY', 'picket')

      expect(response.status).toBe(400)
    })
  })
})