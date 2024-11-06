const express = require("express");
const {
  handleForgotPassword,
  sendMailForgetPassword,
} = require("../controllers/user");
const authenticateToken = require("../middleware/jwtAuthentication");
const {
  handleAdminLogin,
  handleLogin,
  handleSignUp,
} = require("../controllers/auth");

// const {
//   userSignUpSchemaValidation,
//   userLoginValidationSchema,
// } = require("../middleware/joiValidation");

const authRouter = express.Router();

// User Signup Login Route
console.log("Inside auth router");
authRouter.post("/signup", handleSignUp);
authRouter.post("/login", handleLogin);
authRouter.post("/admin/login", handleAdminLogin);
// authRouter.post(
//   "/reset-password",
//   authenticateToken(["super_admin"]),
//   handleResetPassword
// );
// authRouter.post(
//   "/forget-password/email/:token",
//   authenticateToken(["super_admin"]),
//   sendMailForgetPassword
// );

// authRouter.post(
//   "/forget-password/:userId/:token",
//   authenticateToken(["super_admin"]),
//   handleForgotPassword
// );

module.exports = authRouter;
