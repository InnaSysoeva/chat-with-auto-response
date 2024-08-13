import React, {useState, useEffect} from 'react'
import '../styles/ChatCard.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { ProfileImage } from './ProfileImage'

export const ChatCard = ({chat, onClick}) => {

  return (
    <>
        <div className='chat-card' onClick={onClick}>
            <ProfileImage/>
            <div className='chat-info'>
                <p className='username'>{chat.name} {chat.surname}</p>
                <p className='last-msg'>Last Message</p>
            </div>
            <p className='date'>{chat.createdAt}</p>
        </div>
    </>
  )
}
