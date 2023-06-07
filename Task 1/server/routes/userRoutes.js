import express from 'express'
import {
  getUsers,
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  searchUsers
} from '../controllers/userController.js'

const userRoutes = express.Router()

// Route: GET /users
userRoutes.get('/', getUsers)

// Route: GET /users/byId/:id
userRoutes.get('/byId/:id', getUserById)

// Route: GET /users/search
userRoutes.get('/search', searchUsers)

// Route: POST /users
userRoutes.post('/', createUser)

// Route: PUT /users/:id
userRoutes.put('/:id', updateUser)

// Route: DELETE /users/:id
userRoutes.delete('/:id', deleteUser)

export default userRoutes
