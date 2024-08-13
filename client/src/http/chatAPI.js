import { $host } from './index.js'

const createChat = async (chat) => {
    const newChat = await $host.post('api/chats/create', chat)
    return newChat
}  

const getAllMessages = async (chatId) => {
    const allMessages = await $host.get(`api/chats/${chatId}/allMessages`)
    return allMessages
}
 
const updateChat = async (chatId, name, surname) => {
    const updatedMessage = await $host.put(`api/chats/update/${chatId}`, { name, surname })
    return updatedMessage
}

const deleteChat = async (chatId) => {
    const isDeleted = await $host.delete(`api/chats/remove/${chatId}`)
    return isDeleted
}

const searchChats = async (keyword) => {
    const chats = await $host.get(`api/chats/search`, {params: {
        query: keyword
    }})
    return chats
}

const getAllChats = async () => {
    const chats = await $host.get('api/chats/all')
    return chats
}

export {
    createChat, 
    getAllMessages, 
    updateChat,
    deleteChat, 
    searchChats, 
    getAllChats
}