require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { connectMongoDB } = require('./config/db');
const userRouter  = require('./routes/userRoute');
const { productRouter } = require('./routes/productRoute');
const mainRouter = require('./routes/index')
const PORT = 3030;
var cors = require('cors')


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/api',mainRouter);
// app.use('/api',productRouter);


//connection to MongoDB 
connectMongoDB(process.env.MONGODB_URL);


app.get('/',(req,res) => {
    res.send('Testing Route');
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})


 