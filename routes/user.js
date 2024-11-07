const express = require("express");
const { handleGetAllAdmin, handleAddAdmin } = require("../controllers/user");
const authenticateToken = require("../middleware/jwtAuthentication");

const userRouter = express.Router();

userRouter.post("/add", authenticateToken(["SUPER_ADMIN"]), handleAddAdmin);
userRouter.get("/", authenticateToken(["SUPER_ADMIN"]), handleGetAllAdmin);

module.exports = userRouter;
