import express from 'express'
import { getCars, getUserData, registerUser } from '../controllers/userController.js'
import { loginUser } from '../controllers/userController.js'
import { protect } from '../middleware/Auth.js'

const userRouter = express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserData)
userRouter.get('/cars',getCars)

export default userRouter