import React, { useState, useEffect } from 'react';
import { ToastNotification } from '../components/ToastNotification.js'
import '../styles/ToastNotification.css'

export const ToastContainer = ({toastMessages = '' }) => {
    const [toasts, setToasts] = useState([])

    useEffect(() => {
        const messages = typeof toastMessages === 'string' && toastMessages.trim() !== '' ? [toastMessages] : []
        if (messages.length > 0) {
            messages.forEach(message => {
                const truncatedMessage = message.length > 30 ? message.substring(0, 30) + '...' : message
                setToasts((prevToasts) => [...prevToasts, truncatedMessage])
            })
        }
    }, [toastMessages])

    const removeToast = (index) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index))
    }

    return (
        <div id="toast-container">
            {toasts.map((message, index) => (
                <ToastNotification
                    key={index}
                    message={message}
                    onClose={() => removeToast(index)}
                />
            ))}
        </div>
    )
}