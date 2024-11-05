const  logger  = require("../wrapper/logger");
const mongoose = require("mongoose");

const connectMongoDB = async (url) => {
  return await mongoose
    .connect(url, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    })
    .then(() => {
      logger.info("MongoDB connected...");
      console.log("MongoDB connected...");
    })
    .catch((err) => {
      logger.error("Error connecting to MongoDB: ", err);
      console.log("Error in connecting mongoDB...", err);
    });
};

module.exports = connectMongoDB;
