import User from '../models/User.js'

const userController = {
  getUsers(req, res) {
    const users = User.getAllUsers()
    res.json(users)
  }
}

export default userController
