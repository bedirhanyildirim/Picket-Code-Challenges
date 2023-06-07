import User, { getFilePath } from './User.js'
import { jest } from '@jest/globals'
import fs from 'fs'

describe('User Model', () => {
  const mockUsers = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '123456789',
    },
  ]

  let mockedFile

  beforeEach(() => {
    mockedFile = jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockUsers))
  })

  afterEach(() => {
    mockedFile.mockRestore()
  })

  describe('check if return file path', () => {
    it('should return the file name', () => {
      const filePath = getFilePath()
      expect(typeof filePath).toBe("string")
    })
  })

  describe('check if user instant created', () => {
    it('should create user instance', () => {
      let user = new User('1', 'Jonn', 'john@example.com', '123456789')
      expect(user).toBeTruthy()
    })
  })

  describe('getAllUsers', () => {
    it('should return an array of users', () => {
      const users = User.getAllUsers()
      expect(users).toEqual(mockUsers)
      expect(mockedFile).toHaveBeenCalledWith(expect.any(String), 'utf8')
    })
  })

  describe('getUserById', () => {
    it('should return the user with the specified id', () => {
      const userId = '1'
      const user = User.getUserById(userId)
      expect(user).toEqual(mockUsers[0])
    });

    it('should throw an error if the user is not found', () => {
      const userId = '2'
      expect(() => {
        User.getUserById(userId)
      }).toThrow('User not found')
    })
  })

  describe('searchUsers', () => {
    it('should return an array of users matching the search criteria', () => {
      const searchParams = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123',
      }
      const result = User.searchUsers(searchParams)
      expect(result).toEqual([mockUsers[0]])
    })

    it('should throw an error if no users match the search criteria', () => {
      const searchParams = {
        firstName: 'Jane',
      }
      expect(() => {
        User.searchUsers(searchParams)
      }).toThrow('User not found')
    })
  })
})