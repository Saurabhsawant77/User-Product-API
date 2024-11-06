const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleAddUser,
} = require("../controllers/user");
const authenticateToken = require("../middleware/jwtAuthentication");
const { userAddValidationSchema, userUpdateValidationSchema} = require("../middleware/joiValidation");

const userRouter = express.Router();


userRouter.get("/", authenticateToken(["customer_user"]), handleGetAllUsers);
userRouter.get("/:id", authenticateToken(["customer_user"]), handleGetUserById);
userRouter.put("/:id",userUpdateValidationSchema,authenticateToken(["customer_user"]),
handleUpdateUserById);
userRouter.post("/add",userAddValidationSchema,authenticateToken(["customer_user"]),handleAddUser);

module.exports = userRouter;

