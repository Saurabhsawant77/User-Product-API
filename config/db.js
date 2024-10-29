require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../middleware/logger');


const connectMongoDB = async (url) =>{  
    return await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds
        keepAlive: true,
        keepAliveInitialDelay: 300000, // 5 minutes
        retryWrites: true, 
    })
    .then(() => {
        logger.info("MongoDB connected...");
        console.log("MongoDB connected...");
    })
    .catch((err) => {
        logger.error("Error connecting to MongoDB: ", err);
        console.log("Error in connecting mongoDB...",err);
    })
}

module.exports = {
    connectMongoDB
}

