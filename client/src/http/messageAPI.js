import { $host } from './index.js'

const getAutoReply = async () => {
    const autoReply = await $host.get('api/messages/autoreply')
    return autoReply
}

const sendMessage = async (message) => {
    const newMessage = await $host.post('api/messages', message)
    return newMessage
} 

const updateMessage = async (message, messageId) => {
    const newMessage = await $host.put(`api/messages/update/${messageId}`, message)
    return newMessage
} 


export {
    getAutoReply,
    sendMessage, 
    updateMessage
}