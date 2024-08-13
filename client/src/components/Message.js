import React from 'react'
import '../styles/Message.css'

export const Message = ({onMessageUpdate, message}) => { 

  const handleMessageUpdate = () => {
    const messageText = message.text
    const id = message.id
    onMessageUpdate(messageText, id)
  }
  return (
    <>
        <div className={`${message.isAutoReply ? 'message-container' : 'message-container-auto'}`}>
          <div className='profile-img'>
            <div><i className="fas fa-user user-icon"></i></div>
          </div>
          <div className='message-content-container'> 
              <div className={`${message.isAutoReply ? 'message-content' : 'message-content-auto'}`}>{message.text}</div>
              <div className='message-date-container'>
                <p className='message-date'>{message.createdAt}</p>
                <button className='update-message-btn' style={{ display: message.isAutoReply ? 'none' : 'inline-block' }} onClick={handleMessageUpdate}>Update</button>
              </div>
          </div>
        </div> 

    </>
  )
}
