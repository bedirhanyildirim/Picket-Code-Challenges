import User from '../models/User.js'

export const getUsers = (req, res) => {
  const users = User.getAllUsers()
  res.json(users)
}

export const getUserById = (req, res) => {
  try {
    const user = User.getUserById(req.params.id)
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const createUser = (req, res) => {
  const { firstName, lastName, email, phone } = req.body
  try {
    const newUser = User.createUser({ firstName, lastName, email, phone })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateUser = (req, res) => {
  const { id } = req.params
  const { firstName, lastName, email, phone } = req.body
  try {
    const updatedUser = User.updateUser(id, { firstName, lastName, email, phone })
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteUser = (req, res) => {
  const { id } = req.params
  try {
    const deletedUser = User.deleteUser(id)
    res.json(deletedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const searchUsers = (req, res) => {
  const { firstName, lastName, email, phone } = req.query
  try {
    const users = User.searchUsers({ firstName, lastName, email, phone })
    res.json(users)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};