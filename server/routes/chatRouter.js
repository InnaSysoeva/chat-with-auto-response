import express from 'express'
const chatRouter = express.Router()
import {createChat, updateChat, deleteChat, searchChats, getAllMessages, getAllChats} from '../controllers/chatController.js'

// POST /chats
chatRouter.post('/create', createChat)
 
// PUT /chats/:chatId
chatRouter.put('/update/:chatId', updateChat)

// DELETE /chats/:chatId 
chatRouter.delete('/remove/:chatId', deleteChat)

// GET /chats/search?q=keyword
chatRouter.get('/search', searchChats)

//GET /chats/allMessages
chatRouter.get('/:chatId/allMessages', getAllMessages)

//GET /chats/all
chatRouter.get('/all', getAllChats)

export default chatRouter