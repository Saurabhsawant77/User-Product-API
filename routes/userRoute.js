const express = require('express');
const { handleSignUp, handleLogin,handleGetAllUsers,handleGetUserById,handleUpdateUserById, handleAddUser } = require('../controllers/user');
const authenticateToken = require('../middleware/jwtAuthentication');
const {userSignUpSchemaValidation,userLoginValidationSchema,userAddValidationSchema,userUpdateValidationSchema} = require('../middleware/joiValidation');


const userRouter = express.Router();

// User Signup Login Route
console.log("Inside user router")
userRouter.post('/signup',userSignUpSchemaValidation,handleSignUp)
userRouter.post('/login',userLoginValidationSchema,handleLogin)


//User Routes

userRouter.get('/',authenticateToken,handleGetAllUsers);
userRouter.get('/:id',authenticateToken,handleGetUserById);
userRouter.put('/:id',userUpdateValidationSchema,authenticateToken,handleUpdateUserById);
userRouter.post('/add',userAddValidationSchema,authenticateToken,handleAddUser);



module.exports = userRouter






