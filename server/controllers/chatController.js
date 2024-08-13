import asyncHandler from 'express-async-handler'
import Chat from '../models/chatModel.js'
import Message from '../models/messageModel.js'

//POST /chats/create
const createChat = asyncHandler(async (req, res) => {
    const { name, surname, createdBy } = req.body
    
        if (!name || !surname) {
          return res.status(400).json({ message: 'Name and surname are required' })
        }

        const newChat = await Chat.create({
          name,
          surname,
          createdBy,
          timestamp: new Date()
        })

        if(newChat) {
          res.status(200).json({ message: 'Chat created successfully', data: newChat })
        } else {
          res.status(500).json({ message: 'Internal Server Error' })
        } 
})

const updateChat = asyncHandler(async (req, res) => {
    const { chatId } = req.params
    const { name, surname } = req.body

    const chat = await Chat.findById(chatId)
    
    if (!chat) {
      res.status(404).json({ message: 'Chat not found' })
    } else {

      chat.name = name || chat.name
      chat.surname = surname || chat.surname
      const updatedChat = await chat.save()
      res.status(200).json({message: 'Chat updated successfully', data: updatedChat})}
})

const getChatById = asyncHandler(async (req, res) => {
    const { chatId } = req.params

    const chat = await Chat.findById(chatId)

    if (!chat) {
        res.status(404).json({message: 'Chat not found' })
    } else {
        res.status(200).json({message: 'Chat by id', data: chat})}
})

const deleteChat = asyncHandler(async (req, res) => {
    const { chatId } = req.params

    const chat = await Chat.findByIdAndDelete(chatId)

    if (!chat) {
      res.status(404).json({ message: 'Chat not found', data: 0 })
    } else {
      res.status(200).json({message: 'Chat deleted successfully', data: 1})}
})

const searchChats = asyncHandler(async (req, res) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
  
    try {
      const searchTerms = query.split(' ').filter(term => term.length > 0);
      const regexes = searchTerms.map(term => new RegExp(term, 'i'));

      const chats = await Chat.find({
        $and: regexes.map(regex => ({
          $or: [
            { name: { $regex: regex } },
            { surname: { $regex: regex } }
          ]
        }))
      });
  
      res.status(200).json({ message: 'Chats found', data: chats });
    } catch (error) {
      res.status(500).json({ message: 'Error searching chats', error: error.message });
    }
})

const getAllMessages = asyncHandler(async(req, res) => {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({ message: 'Chat ID is required' });
    }
  
    try {
      const messages = await Message.find({ chatId });

      if (messages.length === 0) {
        return res.status(200).json({ message: 'No messages found for this chat', data: []});
      }
      res.status(200).json({ message: 'Messages retrieved successfully', data: messages });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving messages', error: error.message });
    }
})

const getAllChats = asyncHandler(async(req, res) => { 
  try {
    const chats = await Chat.find({});
    res.status(200).json({ message: 'Chats retrieved successfully', data: chats });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chats', error: error.message });
  }
})

export {
    createChat, 
    updateChat,
    deleteChat,
    searchChats,
    getAllMessages, 
    getChatById, 
    getAllChats
}
