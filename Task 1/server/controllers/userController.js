import User from '../models/User.js'

const userController = {
  getUsers(req, res) {
    const users = User.getAllUsers()
    res.json(users)
  },
  getUser(req, res) {
    const user = User.getUserById(req.params.id)
    res.json(user)
  },
  createUser(req, res) {
    const { firstName, lastName, email, phone } = req.body
    const newUser = User.createUser({ firstName, lastName, email, phone })
    res.json(newUser)
  },
  updateUser(req, res) {
    const { id } = req.params
    const { firstName, lastName, email, phone } = req.body
    const updatedUser = User.updateUser(id, { firstName, lastName, email, phone })
    res.json(updatedUser)
  },
}

export default userController
