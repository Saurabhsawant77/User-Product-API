require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const logger = require('./logger');



const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;

    if(!token){
        logger.error('Access denied', token); 
        return res.status(401).json({message:"Access denied"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        logger.info("Request received",req.user);  
        next();
    } catch (error) {
        logger.error('Invalid or expire Token'); 
        res.status(401).json({message:"Invalid or expire Token"});
    }
} 

module.exports = authenticateToken;
