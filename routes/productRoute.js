const express = require('express');
const authenticateToken = require('../middleware/jwtAuthentication')
const {handleGetAllProducts,handleGetProductById,handleCreateProduct,handleUpdateProduct,handleDeleteProduct,handleGetPublishedProducts,handleGetProductByName,handleGetProductByUserId} = require('../controllers/product');


const productRouter = express.Router();

// Product Routes

productRouter.get('/',handleGetAllProducts);
productRouter.get('/:id',handleGetProductById);
productRouter.post('/',authenticateToken,handleCreateProduct);
productRouter.put('/:id',authenticateToken,handleUpdateProduct);
productRouter.delete('/:id',authenticateToken,handleDeleteProduct);
productRouter.get('/published',handleGetPublishedProducts);
productRouter.get('/search',handleGetProductByName);
productRouter.get('/:userId',authenticateToken,handleGetProductByUserId);


module.exports ={
    productRouter
}