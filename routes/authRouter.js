const express = require("express");
const {
  handleSignUp,
  handleLogin,
  handleResetPassword,
} = require("../controllers/user");

// const {
//   userSignUpSchemaValidation,
//   userLoginValidationSchema,
// } = require("../middleware/joiValidation");

const authRouter = express.Router();

// User Signup Login Route
console.log("Inside auth router");
authRouter.post("/signup", handleSignUp);
authRouter.post("/login", handleLogin);
authRouter.post("/reset-password", handleResetPassword);

module.exports = {
  authRouter,
};
