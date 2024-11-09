const express = require('express');
const {handleGetPublishedProducts, handleGetProductByName } = require('../controllers/product');
const authenticateToken = require('../middleware/jwtAuthentication');

const customerRouter = express.Router();


customerRouter.get("/products",authenticateToken(["CUSTOMER"]),handleGetPublishedProducts);
customerRouter.get("/search",authenticateToken(["CUSTOMER"]),handleGetProductByName);
module.exports = customerRouter;
