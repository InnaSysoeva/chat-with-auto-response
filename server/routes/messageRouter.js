import express from 'express'
const messageRouter = express.Router()
import {sendMessage, updateMessage, getAutoReply} from '../controllers/messageController.js'

// POST /messages
messageRouter.post('/', sendMessage)

// PUT //messages/:messageId
messageRouter.put('/update/:messageId', updateMessage)

// GET /messages/autoreply
messageRouter.get('/autoreply', getAutoReply)

export default messageRouter
