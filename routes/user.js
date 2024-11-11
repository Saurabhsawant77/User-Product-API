const express = require("express");
const { handleGetAllAdmin, handleAddAdmin, handleGetAllPartner, handleGetAllCustomer, handleUpdateUserById } = require("../controllers/user");
const authenticateToken = require("../middleware/jwtAuthentication");
const { upload } = require("../wrapper/multer");
const { handleUpdateProduct, handleGetAllProducts, handleGetProductsToVerifyByAdmin } = require("../controllers/product");
const { handleAddPartner, handleGetAllPartnersAddedByAdmin } = require("../controllers/partner");
const { userAddValidationSchema, userUpdateValidationSchema, productValidationUpdateSchema } = require("../middleware/joiValidation");


const userRouter = express.Router();

userRouter.post("/add", authenticateToken(["SUPER_ADMIN"]),userAddValidationSchema, handleAddAdmin);
userRouter.post("/add-partner",authenticateToken(["ADMIN"]),upload.single("profileImage"),userAddValidationSchema,handleAddPartner);
userRouter.put("/verify-product/:updateId",authenticateToken(["ADMIN"]),upload.single("image"),productValidationUpdateSchema,handleUpdateProduct);
userRouter.put("/update-user/:id",authenticateToken(["ADMIN"]),upload.single("image"),userUpdateValidationSchema,handleUpdateUserById);
userRouter.get("/partners-added-by-admin",authenticateToken(["ADMIN"]),handleGetAllPartnersAddedByAdmin);
userRouter.get("/all-admins", authenticateToken(["SUPER_ADMIN"]), handleGetAllAdmin);
userRouter.get("/all-partners",authenticateToken(["SUPER_ADMIN"]),handleGetAllPartner);
userRouter.get("/all-products",authenticateToken(["SUPER_ADMIN"]),handleGetAllProducts);
userRouter.get("/all-customers",authenticateToken(["SUPER_ADMIN"]),handleGetAllCustomer);
userRouter.get("/verfyingproducts",authenticateToken(["ADMIN"]),handleGetProductsToVerifyByAdmin);



module.exports = userRouter;
