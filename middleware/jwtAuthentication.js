require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const bcryptjs = require('bcryptjs');


const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;

    if(!token){
        return res.status(401).json({message:"Access denied"});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid or expire Token"});
    }
} 

module.exports = authenticateToken;
