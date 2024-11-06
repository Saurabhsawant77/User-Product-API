const express = require("express");
const authenticateToken = require("../middleware/jwtAuthentication");
const {
  handleGetAllProducts,
  handleGetProductById,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetPublishedProducts,
  handleGetProductByName,
  handleGetProductByUserId,
} = require("../controllers/product");
const { upload } = require("../wrapper/multer");

const {
  productValidationUpdateSchema,
  productValidationAddSchema,
} = require("../middleware/joiValidation");

const productRouter = express.Router();

// Product Routes

productRouter.get('/',authenticateToken(["customer_user"]),handleGetAllProducts);
productRouter.get('/:id',authenticateToken(["customer_user"]),handleGetProductById);
productRouter.post('/add',authenticateToken(["customer_user"]),upload.single('image'),handleCreateProduct);
productRouter.put('/:id',authenticateToken(["customer_user"]),upload.single('image'),handleUpdateProduct);
productRouter.delete('/:id',authenticateToken(["customer_user"]),handleDeleteProduct);
productRouter.get('/find/:userId',authenticateToken(["customer_user"]),handleGetProductByUserId);
productRouter.get('/published/products',authenticateToken(["customer_user"]),handleGetPublishedProducts);
productRouter.get('/searchProduct/product',authenticateToken(["customer_user"]),handleGetProductByName);


module.exports = productRouter


productRouter.get("/", authenticateToken(["customer_user"]), handleGetAllProducts);
productRouter.get("/:id", authenticateToken(["customer_user"]), handleGetProductById);
productRouter.post(
  "/add",
  authenticateToken(["customer_user"]),
  upload.single("image"),
  productValidationAddSchema,
  handleCreateProduct
);
productRouter.put(
  "/:id",
  authenticateToken(["customer_user"]),
  upload.single("image"),
  productValidationUpdateSchema,
  handleUpdateProduct
);
productRouter.delete("/:id", authenticateToken(["customer_user"]), handleDeleteProduct);
productRouter.get("/find/:userId", authenticateToken(["customer_user"]), handleGetProductByUserId);
productRouter.get(
  "/published/products",
  authenticateToken(["customer_user"]),
  handleGetPublishedProducts
);
productRouter.get(
  "/searchProduct/product",
  authenticateToken(["customer_user"]),
  handleGetProductByName
);

module.exports = productRouter

