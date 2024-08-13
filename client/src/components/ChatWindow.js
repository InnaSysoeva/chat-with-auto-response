import React, {useState, useEffect} from 'react'
import '../styles/ChatWindow.css'
import { ProfileImage } from './ProfileImage'
import { Message } from './Message'
import { getAutoReply, sendMessage, updateMessage } from '../http/messageAPI.js'
import { getAllMessages, updateChat, deleteChat } from '../http/chatAPI.js'
import { format } from 'date-fns'
import { UpdateChatModalWindow } from './UpdateChatModalWindow.js'
import { RemoveChatModalWindow } from './RemoveChatModalWindow.js'
import { ToastContainer } from './ToastContainer.js'

export const ChatWindow = ({chatId, chatNameSurname, onUpdateChat, onChatRemove, isOpen }) => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [name, setName] = useState()
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
    const [toastMessages, setToastMessages] = useState()
    const [isUpdatingMessage, setIsUpdatingMessage] = useState(false)
    // eslint-disable-next-line
    const [messageId, setMessageId] = useState();
    const [updatedMessageId, setUpdatedMessageId] = useState()

    const getAllMessagesById = async (id) => {
      const messages = await getAllMessages(id)
      return messages.data
    }

    useEffect(() => {
        setName(chatNameSurname)
        const fetchMessages = async () => {
          try {
            const response = await getAllMessagesById(chatId)
            
            if(response.data.length !== 0) {
              const formattedMessages = response.data.map(message => ({
              id: message._id,
              chatId: chatId,
              text: message.text,
              isAutoReply: message.isAutoReply,
              createdAt: format(new Date(message.createdAt), 'MM/dd/yyyy, hh:mm a'),
              updatedAt: format(new Date(message.updatedAt), 'MM/dd/yyyy, hh:mm a'),
            }));
            setMessages(formattedMessages)} else {
              setMessages([])
            }
          } catch (error) {
            setMessages([])
          }
        }
  
        fetchMessages()

    }, [chatId, chatNameSurname]);

    const handleCreateMessage = async (messageData, isAutoReply) => {
      const response = await sendMessage(messageData)
      if(!isAutoReply) {
        setMessageId(response.data.data._id)
      }
      return response
    }

    const handleSendMessage = async (e) => {
        if (e.key === 'Enter') {
          e.preventDefault()

          if (!input.trim()) {
            return; 
          }

          const messageData = {
            chatId: chatId,
            userId: '66b75f1f744f85bf5da8a84b',
            text: input,
            isAutoReply: false
          };

          if(isUpdatingMessage) {
            const response = await updateMessage(messageData, updatedMessageId)
            setMessages((prevMessages) =>
              prevMessages.map((message) =>
                message.id === updatedMessageId
                  ? {
                      ...message,
                      id: updatedMessageId,
                      chatId: chatId,
                      text: response.data.data.text,
                      createdAt: format(new Date(response.data.data.createdAt), 'MM/dd/yyyy, hh:mm a'),
                      isAutoReply: false 
                    }
                  : message
              )
            )
            setInput('')
            setIsUpdatingMessage(false)
          } else {
            const response = await handleCreateMessage(messageData, false)

            setMessages((prevMessages) => [
              ...prevMessages,
              {id: response.data.data._id, text: input, createdAt: format(new Date(), 'MM/dd/yyyy, hh:mm a'),  isAutoReply: false}
            ])
            setInput('')
            const autoReply = await getAutoReply()
            if (autoReply) {
              setMessages((prevMessages) => [
                ...prevMessages,
                { text: autoReply.data.data, createdAt: format(new Date(), 'MM/dd/yyyy, hh:mm a'), isAutoReply: true}
              ])
              const messageData = {
                chatId: chatId,
                text: autoReply.data.data,
                userId: '66b75f1f744f85bf5da8a85b',
                isAutoReply: true
              }
  
              setToastMessages(autoReply.data.data)
        
              await handleCreateMessage(messageData, true)
            }}
        }
      };    

      const handleRemoveChat = async () => {
        setIsRemoveModalOpen(true)
      }

      const handleRemoveChatConfirmed = async () => {
          if (chatId) {
         // eslint-disable-next-line
          const response = await deleteChat(chatId)
          onChatRemove(chatId)
          setName(' ')
          setIsRemoveModalOpen(false)
        }
      }

      const handleUpdateChat = async () => {
        setIsUpdateModalOpen(true);
      }

      const handleUpdateChatConfirmed = async ({ name, surname }) => {
        if (chatId) {
          const response = await updateChat(chatId, name, surname)
          const updatedChat = {id: response.data.data._id, name: name, surname: surname, createdAt: format(new Date(response.data.data.createdAt), 'MM/dd/yyyy, hh:mm a')}
          onUpdateChat(updatedChat)
          setIsUpdateModalOpen(false)
        }
      };
    
      const handleClose = () => {
        setIsUpdateModalOpen(false)
        setIsRemoveModalOpen(false)
      };

      const handleMessageUpdate = (messageText, id) => {
        setInput(messageText)
        setIsUpdatingMessage(true)
        setUpdatedMessageId(id)
      }
  return (
    <>
        {isOpen ? (
        <div className='chat-window'>
            <div className='profile-img-container'>
                <ProfileImage/>
                <p className='chat-name'>{name}</p>
                <div className='btn-group'>
                  <button onClick={handleUpdateChat} className='update-chat-btn'>Update chat</button>
                  <button onClick={handleRemoveChat} className='remove-chat-btn'>Remove chat</button>
                </div>
            </div>
            <div className='chat-area'>
                {messages.map((message, index) => (
                <Message key={index} 
                  onMessageUpdate={handleMessageUpdate}
                  message={{
                  id: message.id,
                  text: message.text, 
                  createdAt: message.createdAt, 
                  isAutoReply: message.isAutoReply}}/>))}
            </div>
            <ToastContainer toastMessages={toastMessages}/>
            <div className='message-input-container'>
                <i className="fas fa-paper-plane send-icon"></i>
                <input 
                    className='message-input' 
                    placeholder='Type your message'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleSendMessage}
                ></input>
            </div>
            <UpdateChatModalWindow
              isOpen={isUpdateModalOpen}
              onClose={handleClose}
              onSave={handleUpdateChatConfirmed}
              currentName={name}
            />
            <RemoveChatModalWindow
              isOpen={isRemoveModalOpen}
              onClose={handleClose}
              onConfirm={handleRemoveChatConfirmed}
            />
        </div>) : (
        <div className="chat-window-closed">
          <p>Click on chat to start a conversation</p>
        </div>
      )}
    </>
  )
}
