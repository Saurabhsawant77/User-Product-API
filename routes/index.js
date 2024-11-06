const express = require('express');
const productRouter = require('./productRoute'); 
const userRouter = require('./userRoute');       
const  authRouter  = require('./authRouter');

const router = express.Router();


router.use('/auth',authRouter); 
router.use('/users', userRouter);      
router.use('/products', productRouter); 

module.exports = router;
