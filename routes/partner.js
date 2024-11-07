const express = require("express");
const  {upload}= require('../wrapper/multer');


const authenticateToken = require("../middleware/jwtAuthentication");
const {
  handleAddPartner,
  handleGetAllPartner,
} = require("../controllers/partner");

const partnerRouter = express.Router();

partnerRouter.post("/add",upload.single("profileImage"), authenticateToken(["ADMIN"]), handleAddPartner);
partnerRouter.get("/", authenticateToken(["ADMIN"]), handleGetAllPartner);

module.exports = partnerRouter;
