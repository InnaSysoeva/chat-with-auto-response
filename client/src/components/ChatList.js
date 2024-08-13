import React, {useState, useEffect} from 'react'
import { ChatCard } from './ChatCard.js'

export const ChatList = ({chats, onChatClick }) => {
  // eslint-disable-next-line
  const [allChats, setAllChats] = useState()

  useEffect(() => {
    setAllChats(chats)
  }, [chats])

  return ( 
    <>
      <div>
        {chats.map((chat, index) => (
          <ChatCard key={index} 
            chat={{
            id: chat.id,
            name: chat.name, 
            surname: chat.surname,
            createdAt: chat.createdAt}}
            onClick={() => onChatClick(chat.id, chat.name, chat.surname)}/>))}
      </div>
    </>
  )
}
