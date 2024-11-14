const express = require("express");
const {
  handleGetPublishedProducts,
  handleGetProductByName,
} = require("../controllers/product");
const authenticateToken = require("../middleware/jwtAuthentication");
const { handleAddToCart, handleGetAllCarts } = require("../controllers/cart");
const {
  addToCartSchemaValidation,
  addressSchemaValidation,
  productSchemaValidation,
} = require("../middleware/joiValidation");
const {
  handleAddAddress,
  handlePurchase,
  handleGetAllOrderDetailsByCustomer,
} = require("../controllers/customer");

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

customerRouter.post(
  "/add-address",
  authenticateToken(["CUSTOMER"]),
  addressSchemaValidation,
  handleAddAddress
);

customerRouter.post(
  "/purchase",
  authenticateToken(["CUSTOMER"]),
  productSchemaValidation,
  handlePurchase
);

customerRouter.get(
  "/order-details",
  authenticateToken(["CUSTOMER"]),
  handleGetAllOrderDetailsByCustomer
);

module.exports = customerRouter;
