import User, { getFilePath } from './User.js'
import { jest } from '@jest/globals'
import fs from 'fs'

describe('User Model', () => {
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
    mockedWriteFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {})
  })

  afterEach(() => {
    mockedReadFileSync.mockRestore()
    mockedWriteFileSync.mockRestore()
  })

  describe('getAllUsers', () => {
    it('should return string file path', () => {
      const filePath = getFilePath()
      expect(typeof filePath).toBe('string')
    })
  })

  describe('User instantiation', () => {
    it('should create a new User instance', () => {
      const user = new User('1', 'John', 'Doe', 'john@example.com', '123456789')
      expect(user).toBeInstanceOf(User)
      expect(user.id).toBe('1')
      expect(user.firstName).toBe('John')
      expect(user.lastName).toBe('Doe')
      expect(user.email).toBe('john@example.com')
      expect(user.phone).toBe('123456789')
    })
  })

  describe('getAllUsers', () => {
    it('should return an array of users', () => {
      const users = User.getAllUsers()
      expect(users).toEqual(mockUsers)
      expect(mockedReadFileSync).toHaveBeenCalledWith(expect.any(String), 'utf8')
    })
  })

  describe('getUserById', () => {
    it('should return the user with the specified id', () => {
      const userId = '1'
      const user = User.getUserById(userId)
      expect(user).toEqual(mockUsers[0])
    })

    it('should throw an error if the user is not found', () => {
      const userId = '99'
      expect(() => {
        User.getUserById(userId)
      }).toThrow('User not found')
    })
  })

  describe('createUser', () => {
    it('should create a new user and return the user object', () => {
      const newUser = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        phone: '555555555',
      }

      jest.spyOn(fs, 'writeFileSync').mockReturnValue([...mockUsers, createdUser])

      const createdUser = User.createUser(newUser)

      expect(createdUser.id).toBeDefined()
      expect(createdUser.firstName).toBe(newUser.firstName)
      expect(createdUser.lastName).toBe(newUser.lastName)
      expect(createdUser.email).toBe(newUser.email)
      expect(createdUser.phone).toBe(newUser.phone)

      expect(fs.writeFileSync).toHaveBeenCalledWith(expect.any(String), JSON.stringify([...mockUsers, createdUser], null, 2))
    })

    it('should throw an error if the email already exists', () => {
      const newUser = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'john@example.com',
        phone: '555555555',
      }

      expect(() => {
        User.createUser(newUser)
      }).toThrow('Email already exists')
    })

    it('should throw an error if the phone already exists', () => {
      const newUser = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        phone: '123456789',
      }

      expect(() => {
        User.createUser(newUser)
      }).toThrow('Phone already exists')
    })

    it('should throw an error if the firstName is not provided', () => {
      const newUser = {
        lastName: 'Johnson',
        email: 'alice@example.com',
        phone: '555555555',
      }

      expect(() => {
        User.createUser(newUser)
      }).toThrow('First Name is required')
    })

    it('should throw an error if the lastName is not provided', () => {
      const newUser = {
        firstName: 'Alice',
        email: 'alice@example.com',
        phone: '555555555',
      }

      expect(() => {
        User.createUser(newUser)
      }).toThrow('Last Name is required')
    })

    it('should throw an error if the email is not provided', () => {
      const newUser = {
        firstName: 'Alice',
        lastName: 'Johnson',
        phone: '555555555',
      }

      expect(() => {
        User.createUser(newUser)
      }).toThrow('Email is required')
    })

    it('should throw an error if the phone is not provided', () => {
      const newUser = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
      }

      expect(() => {
        User.createUser(newUser)
      }).toThrow('Phone is required')
    })
  })

  describe('updateUser', () => {
    it('should update the user with the specified id and return the updated user object', () => {
      const userId = '1'
      const updatedUser = {
        firstName: 'John',
        lastName: 'Johnson',
        email: 'john@example.com',
        phone: '123456789',
      }

      const updatedUsersList = mockUsers.map(user => {
        if (user.id === userId) {
          return {
            id: userId,
            firstName: updatedUser.firstName || user.firstName,
            lastName: updatedUser.lastName || user.lastName,
            email: updatedUser.email || user.email,
            phone: updatedUser.phone || user.phone,
          }
        }
        return user
      }).filter(Boolean)

      const spyWriteFileSync = jest.spyOn(fs, 'writeFileSync').mockReturnValue(updatedUsersList)

      const result = User.updateUser(userId, updatedUser)

      expect(result).toEqual({
        id: userId,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
      })

      expect(spyWriteFileSync).toHaveBeenCalledWith(expect.any(String), JSON.stringify(updatedUsersList, null, 2))
    })

    it('should throw an error if the user is not found', () => {
      const userId = '99'
      const updatedUser = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        phone: '555555555',
      }

      expect(() => {
        User.updateUser(userId, updatedUser)
      }).toThrow('User not found')
    })

    it('should throw an error if the updated email already exists for another user', () => {
      const userId = '1'
      const updatedUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'jane@example.com',
        phone: '123456789',
      }

      expect(() => {
        User.updateUser(userId, updatedUser)
      }).toThrow('Email already exists')
    })

    it('should throw an error if the updated phone already exists for another user', () => {
      const userId = '1'
      const updatedUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '987654321',
      }

      expect(() => {
        User.updateUser(userId, updatedUser)
      }).toThrow('Phone already exists')
    })
  })

  describe('deleteUser', () => {
    it('should delete the user with the specified id and return the deleted user object', () => {
      const userId = '2'
      const expectedDeletedUser = mockUsers[1]

      const deletedUser = User.deleteUser(userId)

      expect(deletedUser).toEqual(expectedDeletedUser)
      expect(mockedWriteFileSync).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(mockUsers.filter((user) => user.id !== userId), null, 2)
      )
    })

    it('should throw an error if the user is not found', () => {
      const userId = '99'

      expect(() => {
        User.deleteUser(userId)
      }).toThrow('User not found')

      expect(mockedWriteFileSync).not.toHaveBeenCalled()
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
        firstName: 'Alice',
      }
      expect(() => {
        User.searchUsers(searchParams)
      }).toThrow('User not found')
    })
  })
})