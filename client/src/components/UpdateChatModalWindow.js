import React, { useState, useEffect } from 'react'

export const UpdateChatModalWindow = ({ isOpen, onClose, onSave, currentName }) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    useEffect(() => {
        if (currentName) {
            const [firstName, lastName] = currentName.split(' ')
            setName(firstName || '')
            setSurname(lastName || '')
        }
    }, [currentName]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({name, surname})
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Update Chat</h2>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter first name"
                />
                <label>Surname:</label>
                <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Enter last name"
                />
                <button onClick={handleSave}>OK</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};
