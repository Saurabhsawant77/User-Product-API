require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../middleware/logger');


const connectMongoDB = async (url) =>{  
    return await mongoose.connect(url)
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

