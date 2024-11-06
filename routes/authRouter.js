const express = require("express");
const {
  handleSignUp,
  handleLogin,
  handleResetPassword,
  handleForgetPassword,
  // handleVerifyPassword,
  handleResetForgotPassword
} = require("../controllers/auth");
const { userSignUpSchemaValidation, userLoginValidationSchema,} = require('../middleware/joiValidation');
const authenticateToken = require("../middleware/jwtAuthentication");

const authRouter = express.Router();

// User Signup Login Route
console.log("Inside auth router");
authRouter.post("/signup",userSignUpSchemaValidation, handleSignUp);
authRouter.post("/login",userLoginValidationSchema, handleLogin);
authRouter.post("/reset-password", handleResetPassword);
authRouter.post("/verify-email",handleForgetPassword);
authRouter.post("/reset-forget-password",authenticateToken(["customer_user"]),handleResetForgotPassword);


module.exports = authRouter
