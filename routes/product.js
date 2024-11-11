const express = require("express");
const {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetAllProductsAddedByPartner,
  handleUpdateProduct,
  // handleGetProductsToVerifyByAdmin,
} = require("../controllers/product");
const { upload } = require("../wrapper/multer");
const authenticateToken = require("../middleware/jwtAuthentication");

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.single("image"),
  authenticateToken(["PARTNER"]),

  handleCreateProduct
);
productRouter.get(
  "/all",
  authenticateToken(["SUPER_ADMIN"]),
  handleGetAllProducts
);
productRouter.get(
  "/",
  authenticateToken(["PARTNER"]),
  handleGetAllProductsAddedByPartner
);
// productRouter.get("/verfyingproducts",authenticateToken(["ADMIN"]),handleGetProductsToVerifyByAdmin);
productRouter.put(
  "/updateProduct/:id",
  upload.single("image"),
  authenticateToken(["PARTNER"]),
  handleUpdateProduct
);
module.exports = productRouter;
