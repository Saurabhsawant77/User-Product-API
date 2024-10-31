const express = require('express');
const productRouter = require('./productRoute'); 
const userRouter = require('./userRoute');       

const router = express.Router();


router.use('/products', productRouter); 
router.use('/users', userRouter);       

module.exports = router;
