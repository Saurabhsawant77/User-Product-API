const express = require("express");
const { upload } = require("../wrapper/multer");

const authenticateToken = require("../middleware/jwtAuthentication");
// const {handleGetAllPartnersAddedByAdmin} = require("../controllers/partner");
const { handleUpdateProduct, handleCreateProduct, handleGetAllProductsAddedByPartner } = require("../controllers/product");
const { productValidationUpdateSchema, productValidationAddSchema } = require("../middleware/joiValidation");

const partnerRouter = express.Router();


partnerRouter.post("/add-product",productValidationAddSchema,upload.single("image"),authenticateToken(["PARTNER"]),handleCreateProduct);
partnerRouter.put("/updateProduct",productValidationUpdateSchema,authenticateToken(["PARTNER"]),handleUpdateProduct);
partnerRouter.get("/",authenticateToken(["PARTNER"]),handleGetAllProductsAddedByPartner);



module.exports = partnerRouter;
