import User from '../models/User.js'

const userController = {
  getUsers(req, res) {
    const users = User.getAllUsers()
    res.json(users)
  },
  getUser(req, res) {
    const user = User.getUserById(req.params.userId)
    res.json(user)
  },
  createUser(req, res) {
    const { firstName, lastName, email, phone } = req.body
    const newUser = User.createUser({ firstName, lastName, email, phone })
    res.json(newUser)
  },
}

export default userController
