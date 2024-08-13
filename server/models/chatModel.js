import mongoose from 'mongoose' 

const chatSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    surname: {
        type: String,
        required: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Chat = mongoose.model('Chat', chatSchema);

export default Chat