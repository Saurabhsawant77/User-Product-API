const express = require("express");
const {
  handleSignUp,
  handleLogin,
  handleResetPassword,
  verifyEmailForgetPassword,
  handleResetForgotPassword,
 
} = require("../controllers/auth");
const authenticateToken = require("../middleware/jwtAuthentication");
const { userSignUpSchemaValidation } = require("../middleware/joiValidation");

const authRouter = express.Router();

authRouter.post("/signup",userSignUpSchemaValidation, handleSignUp);
authRouter.post("/login", handleLogin);
authRouter.post(
  "/reset-password",
  authenticateToken(["SUPER_ADMIN", "ADMIN", "CUSTOMER", "PARTNER"]),
  handleResetPassword
);

authRouter.post(
  "/verify-email",
  verifyEmailForgetPassword
);
authRouter.post(
  "/reset-forget-password",
  authenticateToken(["SUPER_ADMIN", "ADMIN", "CUSTOMER", "PARTNER"]),
  handleResetForgotPassword
);

module.exports = authRouter;
