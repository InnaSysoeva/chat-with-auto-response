import React, { useEffect, useState } from 'react'
import '../styles/ToastNotification.css'

export const ToastNotification = ({ message, onClose }) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000);
 
        return () => clearTimeout(timer)
    }, [message])

    useEffect(() => {
        if (!visible) {
            const timer = setTimeout(() => {
                onClose()
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [visible, onClose])

    return (
        <div className={`toast ${visible ? 'show' : ''}`}>
            <p>You've got a new message!</p>
            {message}
        </div>
    )
}
