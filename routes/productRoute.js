const express = require('express');
const authenticateToken = require('../middleware/jwtAuthentication')
const {handleGetAllProducts,handleGetProductById,handleCreateProduct,handleUpdateProduct,handleDeleteProduct,handleGetPublishedProducts,handleGetProductByName,handleGetProductByUserId} = require('../controllers/product');
const { upload } = require('../middleware/multer');

const {productValidationAddSchema,productValidationUpdateSchema} = require('../middleware/joiValidation');


const productRouter = express.Router();

// Product Routes

productRouter.get('/',authenticateToken,handleGetAllProducts);
productRouter.get('/:id',authenticateToken,handleGetProductById);
productRouter.post('/add',authenticateToken,upload.single('image'),handleCreateProduct);
productRouter.put('/:id',authenticateToken,upload.single('image'),productValidationUpdateSchema,handleUpdateProduct);
productRouter.delete('/:id',authenticateToken,handleDeleteProduct);
productRouter.get('/find/:userId',authenticateToken,handleGetProductByUserId);
productRouter.get('/published/products',authenticateToken,handleGetPublishedProducts);
productRouter.get('/searchProduct/product',authenticateToken,handleGetProductByName);


module.exports ={
    productRouter
}


