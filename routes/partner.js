const express = require("express");
const { upload } = require("../wrapper/multer");

const authenticateToken = require("../middleware/jwtAuthentication");
// const {handleGetAllPartnersAddedByAdmin} = require("../controllers/partner");
const { handleUpdateProduct, handleCreateProduct, handleGetAllProductsAddedByPartner, handleGetProductByName, handleDeleteProduct } = require("../controllers/product");
const { productValidationUpdateSchema, productValidationAddSchema } = require("../middleware/joiValidation");

const partnerRouter = express.Router();


partnerRouter.post("/add-product",authenticateToken(["PARTNER"]),upload.single("image"),productValidationAddSchema,handleCreateProduct);
partnerRouter.put("/updateProduct/:updateId",authenticateToken(["PARTNER"]),upload.single("image"),productValidationUpdateSchema,handleUpdateProduct);
partnerRouter.get("/",authenticateToken(["PARTNER"]),handleGetAllProductsAddedByPartner);
partnerRouter.get("/search",authenticateToken(["PARTNER"]),handleGetProductByName);
partnerRouter.delete("/delete-product/:id",authenticateToken(["PARTNER","ADMIN"]),handleDeleteProduct);


module.exports = partnerRouter;
