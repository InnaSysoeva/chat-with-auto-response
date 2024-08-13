import express from 'express'
const userRouter = express.Router()
import {authUser, logOutUser, registerUser, getAllChats} from '../controllers/userController.js'

userRouter.post('/auth', authUser)
userRouter.post('/register', registerUser)
userRouter.post('/logout', logOutUser)
userRouter.get('/all', getAllChats)

export default userRouter