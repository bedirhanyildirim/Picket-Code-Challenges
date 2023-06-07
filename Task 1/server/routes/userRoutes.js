import express from 'express'
import userController from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.get('/getAll', userController.getUsers)
userRoutes.get('/:userId', userController.getUser)
userRoutes.post('/new', userController.createUser)

export default userRoutes
