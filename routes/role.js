const express = require("express");
 
const { handleGetAllRoles } = require("../controllers/role");

const roleRouter = express.Router();

roleRouter.get("/", handleGetAllRoles);
 

module.exports = roleRouter;
