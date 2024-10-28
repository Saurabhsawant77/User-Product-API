const express = require('express');
const { handleSignUp, handleLogin,handleGetAllUsers,handleGetUserById,handleUpdateUserById } = require('../controllers/user')

const userRouter = express.Router();

// User Signup Login Route
console.log("Inside user router")
userRouter.post('/signup',handleSignUp)
userRouter.post('/login',handleLogin)


//User Routes

userRouter.get('/',handleGetAllUsers);
userRouter.get('/:id',handleGetUserById);
userRouter.put('/:id',handleUpdateUserById);
userRouter.post('/',handleSignUp);


module.exports = userRouter






