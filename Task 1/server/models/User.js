import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const usersPath = path.join(__dirname, '..', '..','data', 'users.json')

class User {

  static getAllUsers() {
    const usersData = fs.readFileSync(usersPath, 'utf8')
    return JSON.parse(usersData)
  }

  static getUserById(id) {
    const users = User.getAllUsers()
    return users.find((user) => user.id === id)
  }

  static createUser(user) {
    const users = User.getAllUsers()

    // Check for unique email
    const isEmailTaken = users.some((existingUser) => existingUser.email === user.email)
    if (isEmailTaken) {
      throw new Error('Email already exists')
    }

    // Check for unique phone
    const isPhoneTaken = users.some((existingUser) => existingUser.phone === user.phone)
    if (isPhoneTaken) {
      throw new Error('Phone already exists')
    }

    // Check for non-empty first name
    if (!user.firstName) {
      throw new Error('First Name is required')
    }

    // Check for non-empty last name
    if (!user.lastName) {
      throw new Error('Last Name is required')
    }

    // Check for non-empty email
    if (!user.email) {
      throw new Error('Email is required')
    }

    // Check for non-empty phone
    if (!user.phone) {
        throw new Error('Phone is required')
      }

    const newUser = {
      id: uuid(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    }

    users.push(newUser)
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
    return newUser
  }
}

export default User