import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { fileURLToPath } from 'url'

export const getFilePath = () => {
  const filename = fileURLToPath(import.meta.url)
  const dirname = path.dirname(filename)
  return path.join(dirname, '..', '..', 'data', 'users.json')
}

export default class User {

  constructor(id, firstName, lastName, email, phone) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
  }

  static getAllUsers() {
    const usersData = fs.readFileSync(getFilePath(), 'utf8')
    return JSON.parse(usersData)
  }

  static getUserById(id) {
    const users = User.getAllUsers()
    const user = users.find((user) => user.id === id)
    if (user) {
      return user
    }
    throw new Error('User not found')
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

    const newUser = new User(
      uuid(),
      user.firstName,
      user.lastName,
      user.email,
      user.phone
    )

    users.push(newUser)
    fs.writeFileSync(getFilePath(), JSON.stringify(users, null, 2))
    return newUser
  }

  static updateUser(id, updatedUser) {
    const users = User.getAllUsers()
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const existingUser = users[userIndex]

    // Check for unique email (excluding the current user)
    const isEmailTaken = users.some(
      (existingUser) => existingUser.email === updatedUser.email && existingUser.id !== id
    )
    if (isEmailTaken) {
      throw new Error('Email already exists')
    }

    // Check for unique phone (excluding the current user)
    const isPhoneTaken = users.some(
      (existingUser) => existingUser.phone === updatedUser.phone && existingUser.id !== id
    )
    if (isPhoneTaken) {
      throw new Error('Phone already exists')
    }

    // Concatenate existing user data with updated fields
    const updatedUserData = new User(
      existingUser.id,
      updatedUser.firstName || existingUser.firstName,
      updatedUser.lastName || existingUser.lastName,
      updatedUser.email || existingUser.email,
      updatedUser.phone || existingUser.phone,
    )

    users[userIndex] = updatedUserData;
    fs.writeFileSync(getFilePath(), JSON.stringify(users, null, 2))
    return updatedUserData
  }

  static deleteUser(id) {
    const users = User.getAllUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    fs.writeFileSync(getFilePath(), JSON.stringify(users, null, 2));
    return deletedUser;
  }

  static searchUsers({ firstName, lastName, email, phone }) {
    const users = User.getAllUsers()
    const result = users.filter((user) => {
      const isFirstNameMatched = firstName ? user.firstName.toLowerCase().includes(firstName.toLowerCase()) : true
      const isLastNameMatched = lastName ? user.lastName.toLowerCase().includes(lastName.toLowerCase()) : true
      const isEmailMatched = email ? user.email.toLowerCase().includes(email.toLowerCase()) : true
      const isPhoneMatched = phone ? user.phone.toLowerCase().includes(phone.toLowerCase()) : true

      return isFirstNameMatched && isLastNameMatched && isEmailMatched && isPhoneMatched
    })
    if (result.length > 0) {
      return result
    }
    throw new Error('User not found')
  }
}
