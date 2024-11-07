const express = require("express");

const { handleGetAllRoles } = require("../controllers/role");
const authenticateToken = require("../middleware/jwtAuthentication");

const roleRouter = express.Router();

roleRouter.get(
  "/",
  authenticateToken(["SUPER_ADMIN", "ADMIN", "CUSTOMER", "PARTNER"]),
  handleGetAllRoles
);

module.exports = roleRouter;
