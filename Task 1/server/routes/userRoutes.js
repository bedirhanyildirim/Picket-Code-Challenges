import express from 'express'
import userController from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.get('/getAll', userController.getUsers)

export default userRoutes
