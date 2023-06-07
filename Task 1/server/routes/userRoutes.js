import express from 'express'
import userController from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.get('/getAll', userController.getUsers)
userRoutes.get('/:id', userController.getUser)
userRoutes.post('/new', userController.createUser)
userRoutes.put('/:id', userController.updateUser)

export default userRoutes
