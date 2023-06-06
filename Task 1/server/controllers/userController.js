import User from '../models/User.js'

const userController = {
  getUsers(req, res) {
    const users = User.getAllUsers()
    res.json(users)
  },
  getUser(req, res) {
    const user = User.getUserById(req.params.userId)
    res.json(user)
  }
}

export default userController
