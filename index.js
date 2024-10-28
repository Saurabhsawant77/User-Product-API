require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { connectMongoDB } = require('./config/db');
const userRouter  = require('./routes/userRoute');
// const { productRouter } = require('./routes/productRoute');
const PORT = 3030;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/api/users',userRouter);
// app.use('/api/products',productRouter);


//connection to MongoDB 
connectMongoDB(process.env.MONGODB_URL);


app.get('/',(req,res) => {
    res.send('Testing Route');
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})


 