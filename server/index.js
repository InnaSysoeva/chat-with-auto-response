import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import userRouter from './routes/userRouter.js'
import chatRouter from './routes/chatRouter.js'
import messageRouter from './routes/messageRouter.js'

connectDB()
 
const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/users/', userRouter)
app.use('/api/chats/', chatRouter)
app.use('/api/messages/', messageRouter)

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
