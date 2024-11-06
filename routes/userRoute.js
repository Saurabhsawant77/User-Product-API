const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,

  handleAddAdminUser,
} = require("../controllers/user");
const authenticateToken = require("../middleware/jwtAuthentication");
const {
  userSignUpSchemaValidation,
  userLoginValidationSchema,
  userAddValidationSchema,
  userUpdateValidationSchema,
} = require("../middleware/joiValidation");

const userRouter = express.Router();

// User Signup Login Route
console.log("Inside user router");
// userRouter.post("/signup", userSignUpSchemaValidation, handleSignUp);
// userRouter.post("/login", userLoginValidationSchema, handleLogin);

//User Routes

userRouter.get("/", authenticateToken(["super_admin"]), handleGetAllUsers);
userRouter.get("/:id", authenticateToken, handleGetUserById);
userRouter.put(
  "/:id",
  userUpdateValidationSchema,
  authenticateToken,
  handleUpdateUserById
);
userRouter.post("/add", authenticateToken(["super_admin"]), handleAddAdminUser);

module.exports = userRouter;
