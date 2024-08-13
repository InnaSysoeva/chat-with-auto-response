import Message from "../models/messageModel.js"
import asyncHandler from 'express-async-handler'

// POST /messages

const sendMessage = asyncHandler(async (req, res) => {
        const { chatId, userId, text, isAutoReply } = req.body
    
        if (!text) {
          return res.status(400).json({ message: 'Text are required' })
        }

        const newMessage = await Message.create({
          chatId,
          userId: userId || 'auto',
          text, 
          timestamp: new Date(),
          isAutoReply: isAutoReply
        })

        if(newMessage) {
          res.status(200).json({ message: 'Message sent successfully', data: newMessage })
        } else {
          res.status(500).json({ message: 'Internal Server Error' })
        } 
})

const updateMessage = asyncHandler(async (req, res) => {
    const { messageId } = req.params
    const { text } = req.body

    const message = await Message.findById(messageId)

    if (!message) {
      res.status(404).json({ message: 'Message not found' })
    } else {

      message.text = text || message.text
      const updatedMessage = await message.save()
      res.status(200).json({message: 'Message updated successfully', data: updatedMessage})}
})
  
const getAutoReply = asyncHandler(async (req, res) => {
    const response = await fetch('https://api.quotable.io/random');
    const quote = await response.json()

    if(quote) {
      setTimeout(() => {
        res.status(200).json({ message: 'Quote sent', data: quote.content })
    }, 3000)
    } else {
      res.status(404).json({message: 'Something went wrong'})
    }
})

export {
    sendMessage,
    updateMessage,
    getAutoReply
}
  