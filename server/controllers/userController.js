import asyncHandler from 'express-async-handler'
// @desc Auth user/set token

const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'auth user'})
})

// @desc Register a new user

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'register user'})
})

// @desc Logout user

const logOutUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'logout user'})
})

//get all user's chats
const getAllChats = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'get all chats'})
})

export {
    authUser,
    registerUser,
    logOutUser, 
    getAllChats
}