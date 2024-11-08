const express = require("express");
const { upload } = require("../wrapper/multer");

const authenticateToken = require("../middleware/jwtAuthentication");
const {
  handleAddPartner,
  handleGetAllPartnersAddedByAdmin,
  handleGetAllPartner,
} = require("../controllers/partner");

const partnerRouter = express.Router();

partnerRouter.post(
  "/add",
  upload.single("profileImage"),
  authenticateToken(["ADMIN"]),
  handleAddPartner
);
partnerRouter.get(
  "/",
  authenticateToken(["ADMIN"]),
  handleGetAllPartnersAddedByAdmin
);

partnerRouter.get(
  "/all",
  authenticateToken(["SUPER_ADMIN"]),
  handleGetAllPartner
);

module.exports = partnerRouter;
