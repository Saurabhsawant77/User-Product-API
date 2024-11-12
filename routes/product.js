const express = require("express");
const {
  // handleCreateProduct,
  handleGetAllProducts,
  handleGetAllProductsAddedByPartner,
  handleUpdateProduct,
  // handleGetProductsToVerifyByAdmin,
} = require("../controllers/product");
const { upload } = require("../wrapper/multer");
const authenticateToken = require("../middleware/jwtAuthentication");

const productRouter = express.Router();

<<<<<<< HEAD
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
=======
// productRouter.post(
//   "/add",
//   upload.single("image"),
//   authenticateToken(["PARTNER"]),
//   handleCreateProduct
// );
// productRouter.get(
//   "/all",
//   authenticateToken(["SUPER_ADMIN"]),
//   handleGetAllProducts
// );
// productRouter.get(
//   "/",
//   authenticateToken(["PARTNER"]),
//   handleGetAllProductsAddedByPartner
// );
// productRouter.get("/verfyingproducts",authenticateToken(["ADMIN"]),handleGetProductsToVerifyByAdmin);
// productRouter.put("/updateProduct/:id",upload.single("image"),authenticateToken(["PARTNER"]),handleUpdateProduct)
>>>>>>> c3c2ec4c6eeace5bea3f0915a7d809f4cbdceafe
module.exports = productRouter;
