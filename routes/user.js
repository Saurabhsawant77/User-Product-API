const express = require("express");
const { handleAddUser, handleGetAllAdmin } = require("../controllers/user");
const authenticateToken = require("../middleware/jwtAuthentication");

const userRouter = express.Router();

userRouter.post("/add", authenticateToken(["SUPER_ADMIN"]), handleAddUser);
userRouter.get("/", authenticateToken(["SUPER_ADMIN"]), handleGetAllAdmin);

module.exports = userRouter;
