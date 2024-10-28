require('dotenv').config();
const mongoose = require('mongoose');


const connectMongoDB = async (url) =>{  
    return await mongoose.connect(url)
    .then(() => {
        console.log("MongoDB connected...");
    })
    .catch((err) => {
        console.log("Error in connecting mongoDB...");
    })
}

module.exports = {
    connectMongoDB
}

