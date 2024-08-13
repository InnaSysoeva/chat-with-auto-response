import React from 'react';

export const RemoveChatModalWindow = ({ isOpen, onClose, onConfirm }) => {
    
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Do you really want to remove this chat?</h2>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};