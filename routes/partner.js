const express = require("express");
const { upload } = require("../wrapper/multer");

const authenticateToken = require("../middleware/jwtAuthentication");
const {
  handleGetAllPartnersAddedByAdmin,
} = require("../controllers/partner");
const { handleAddPartner } = require("../controllers/admin");
const { handleUpdateProduct } = require("../controllers/product");

const partnerRouter = express.Router();


partnerRouter.get("/",authenticateToken(["ADMIN"]),handleGetAllPartnersAddedByAdmin);
partnerRouter.put("/updateProduct",authenticateToken(["PARTNER"]),handleUpdateProduct);


module.exports = partnerRouter;
