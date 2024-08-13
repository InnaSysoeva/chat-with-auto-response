import React, {useState} from 'react'
import '../styles/AddChatModalWindow.css'

export const AddChatModalWindow = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !surname) {
      setError('Both fields are required')
      return
    }
    onCreate({ name, surname})
    setName('')
    setSurname('')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Chat</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder='Enter Name'
            />
          </div>
          <div>
            <label>Surname:</label>
            <input 
              type="text" 
              value={surname} 
              onChange={(e) => setSurname(e.target.value)} 
              required 
              placeholder='Enter Surname'
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Create Chat</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  )
}
