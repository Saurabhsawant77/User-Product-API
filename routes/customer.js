const express = require("express");
const {
  handleGetPublishedProducts,
  handleGetProductByName,
} = require("../controllers/product");
const authenticateToken = require("../middleware/jwtAuthentication");
const { handleAddToCart, handleGetAllCarts } = require("../controllers/cart");
const { addToCartSchemaValidation } = require("../middleware/joiValidation");

const customerRouter = express.Router();

customerRouter.get(
  "/products",
  authenticateToken(["CUSTOMER"]),
  handleGetPublishedProducts
);
customerRouter.get(
  "/search",
  authenticateToken(["CUSTOMER"]),
  handleGetProductByName
);
customerRouter.post(
  "/add-to-cart",
  authenticateToken(["CUSTOMER"]),
  addToCartSchemaValidation,
  handleAddToCart
);
customerRouter.get(
  "/get-all-carts",
  authenticateToken(["CUSTOMER"]),
  handleGetAllCarts
);

module.exports = customerRouter;
