const express = require("express");
const {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetAllProductsAddedByPartner,
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

module.exports = productRouter;
