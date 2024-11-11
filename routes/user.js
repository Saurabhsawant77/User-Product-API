const express = require("express");
const { handleGetAllAdmin, handleAddAdmin, handleGetAllPartner, handleGetAllCustomer, handleUpdateUserById } = require("../controllers/user");
const authenticateToken = require("../middleware/jwtAuthentication");
const { upload } = require("../wrapper/multer");
const { handleUpdateProduct, handleGetAllProducts, handleGetProductsToVerifyByAdmin } = require("../controllers/product");
const { handleAddPartner, handleGetAllPartnersAddedByAdmin } = require("../controllers/partner");


const userRouter = express.Router();

userRouter.post("/add", authenticateToken(["SUPER_ADMIN"]), handleAddAdmin);
userRouter.post("/add-partner",upload.single("profileImage"),authenticateToken(["ADMIN"]),handleAddPartner);
userRouter.put("/verifyProduct/:id",upload.single("image"),authenticateToken(["ADMIN"]),handleUpdateUserById);
userRouter.get("/partners-added-by-admin",authenticateToken(["ADMIN"]),handleGetAllPartnersAddedByAdmin);
userRouter.get("/all-admins", authenticateToken(["SUPER_ADMIN"]), handleGetAllAdmin);
userRouter.get("/all-partners",authenticateToken(["SUPER_ADMIN"]),handleGetAllPartner);
userRouter.get("/all-products",authenticateToken(["SUPER_ADMIN"]),handleGetAllProducts);
userRouter.get("/all-customers",authenticateToken(["SUPER_ADMIN"]),handleGetAllCustomer);
userRouter.get("/verfyingproducts",authenticateToken(["ADMIN"]),handleGetProductsToVerifyByAdmin);
userRouter.put("/verifyProduct/:id",upload.single("image"),authenticateToken(["ADMIN"]),handleUpdateProduct);


module.exports = userRouter;
