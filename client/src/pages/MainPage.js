import React, { useState, useEffect } from 'react'
import '../styles/MainPage.css'
import { UserCard } from '../components/UserCard.js'
import { ChatWindow } from '../components/ChatWindow.js'
import { ChatList } from '../components/ChatList.js'
import { createChat, searchChats, getAllChats } from '../http/chatAPI.js'
import { format } from 'date-fns'

export const MainPage = () => {
  const [chats, setChats] = useState([])
  const [selectedChatId, setSelectedChatId] = useState()
  const [chatNameSurname, setChatNameSurname] = useState()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getAllChats()
  
        if (Array.isArray(response.data.data)) {
          const chatsWithId = response.data.data.map(chat => ({
            ...chat,
            id: chat._id,   
            _id: undefined,
            createdAt: format(new Date(chat.createdAt), 'MM/dd/yyyy, hh:mm a')    
          }))
          const sortedChats = chatsWithId.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          setChats(sortedChats);
        } else {
          console.error('Expected an array but received:', typeof response.data.data)
        }
      } catch (error) {
        console.error('Error fetching chats:', error)
      }
    };
  
    fetchChats()
  }, [])

  const handleCreateChat = async (chatData) => {
    const response = await createChat(chatData)
    const chat = response.data.data 
    const newChat = {
      id: chat._id,
      name: chat.name, 
      surname: chat.surname,
      createdAt: format(chat.createdAt, 'MMM dd, yyyy')
    }
    setChats((prevChats) => [newChat, ...prevChats])
    setSelectedChatId(newChat.id)
    setChatNameSurname(newChat.name + ' ' + newChat.surname)
  }

  const handleChatClick = (chatId, name, surname) => {
    setSelectedChatId(chatId)
    setChatNameSurname(name + ' ' + surname)
    setIsOpen(true)
  }

  const handleUpdateChat = (updatedChat) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
          chat.id === updatedChat.id ? updatedChat : chat
      )
    )

    setChatNameSurname(updatedChat.name + ' ' + updatedChat.surname)
  }

  const handleRemoveChat = (chatId) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    setIsOpen(false)
  }

  const handleSearchChat = async (input) => {
    console.log(input)
    const response = await searchChats(input)
    const chatsWithId = response.data.data.map(chat => ({
      ...chat,
      id: chat._id, 
      createdAt: format(chat.createdAt, 'MMM dd, yyyy')
    }));
    setChats(chatsWithId)
  }

  return (
    <>
      <div className='main-page-container'>
        <div className='chat-list-container'>
          <UserCard 
            onCreateChat={handleCreateChat}
            onSearchChat={handleSearchChat}
          />
          <div className='chat-label'>Chats</div>
          <ChatList 
            chats={chats} 
            onChatClick={handleChatClick} 
          />
        </div>
        <ChatWindow 
          chatId={selectedChatId} 
          isOpen={isOpen}
          chatNameSurname={chatNameSurname}
          onUpdateChat={handleUpdateChat}
          onChatRemove={handleRemoveChat}/>
      </div>
    </>
  )
}
