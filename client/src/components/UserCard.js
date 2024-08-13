import React, {useState} from 'react'
import '../styles/UserCard.css'
import { ProfileImage } from './ProfileImage'
import { AddChatModalWindow } from './AddChatModalWindow.js'
import '@fortawesome/fontawesome-free/css/all.css'

export const UserCard = ({onCreateChat, onSearchChat}) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [input, setInput] = useState('')

  const handleCreateChat = async (chatData) => {
    await onCreateChat(chatData)
  };

  const handleSearchChat = (input) => {
    onSearchChat(input)
  }

  return (
    <>
        <div className='user-card'>
            <ProfileImage/>
            <div className='btn-container'>
              <button className='log-in-btn'>Log in</button>
              <button className='create-chat-btn' onClick={() => setModalOpen(true)}>Create new chat</button>
            </div>
            <div className='search-container'>
              <i className="fas fa-search"></i>
              <input  
                className='search-input' 
                placeholder='Search chat'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              ></input>
              <button className='search-chat-btn' onClick={() => {
                if (input.trim() === '') {
                  alert('Please enter a search term.');
                } else {
                  handleSearchChat(input);
                }
                }}>Search</button>
             </div>
            <AddChatModalWindow 
              isOpen={isModalOpen} 
              onClose={() => setModalOpen(false)} 
              onCreate={handleCreateChat} 
            />
        </div>
    </>
  )
}
