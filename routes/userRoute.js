const express = require('express');
const { handleSignUp, handleLogin,handleGetAllUsers,handleGetUserById,handleUpdateUserById, handleAddUser } = require('../controllers/user');
const authenticateToken = require('../middleware/jwtAuthentication');

const userRouter = express.Router();

// User Signup Login Route
console.log("Inside user router")
userRouter.post('/signup',handleSignUp)
userRouter.post('/login',handleLogin)


//User Routes

userRouter.get('/',handleGetAllUsers);
userRouter.get('/:id',handleGetUserById);
userRouter.put('/:id',handleUpdateUserById);
userRouter.post('/add',authenticateToken,handleAddUser);



module.exports = userRouter






