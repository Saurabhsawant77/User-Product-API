const express = require("express");
const {
  handleSignUp,
  handleLogin,
  handleResetPassword,
} = require("../controllers/auth");
const authenticateToken = require("../middleware/jwtAuthentication");

const authRouter = express.Router();

authRouter.post("/signup", handleSignUp);
authRouter.post("/login", handleLogin);
authRouter.post("/reset-password", handleResetPassword);

module.exports = authRouter;
