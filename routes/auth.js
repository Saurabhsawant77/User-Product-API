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
authRouter.post(
  "/reset-password",
  authenticateToken(["SUPER_ADMIN", "ADMIN", "CUSTOMER", "PARTNER"]),
  handleResetPassword
);

// authRouter.post(
//   "/verify-email",
//   authenticateToken(["SUPER_ADMIN", "ADMIN", "CUSTOMER", "PARTNER"]),
//   verifyEmailForgetPassword
// );
// authRouter.post(
//   "/reset-forget-password",
//   authenticateToken(["SUPER_ADMIN", "ADMIN", "CUSTOMER", "PARTNER"]),
//   handleResetForgotPassword
// );

module.exports = authRouter;
