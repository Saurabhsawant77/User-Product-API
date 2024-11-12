const express = require("express");
const {
  handleSignUp,
  handleLogin,
  handleResetPassword,
  verifyEmailForgetPassword,
  handleResetForgotPassword,
} = require("../controllers/auth");

const authenticateToken = require("../middleware/jwtAuthentication");
const { userSignUpSchemaValidation, userLoginValidationSchema, verifyUserEmailValidation, resetForgetPasswordSchemaValidation, resetPasswordSchemaValidation } = require("../middleware/joiValidation");

const authRouter = express.Router();

authRouter.post("/signup",userSignUpSchemaValidation, handleSignUp);
authRouter.post("/login",userLoginValidationSchema, handleLogin);
authRouter.post("/reset-password",authenticateToken(["SUPER_ADMIN", "ADMIN", "CUSTOMER", "PARTNER"]),resetPasswordSchemaValidation,handleResetPassword);

authRouter.post(
  "/verify-email",
  verifyUserEmailValidation,
  verifyEmailForgetPassword
);

authRouter.post(
  "/reset-forget-password",
  authenticateToken(["SUPER_ADMIN", "ADMIN", "CUSTOMER", "PARTNER"]),
  resetForgetPasswordSchemaValidation,
  handleResetForgotPassword
);

module.exports = authRouter;
