const express = require("express");

const authRouter = require("./auth");
const userRouter = require("./user");
const roleRouter = require("./role");

const mainRouter = express.Router();

// mainRouter.use("/admin",adminRouter)
mainRouter.use("/auth", authRouter);
mainRouter.use("/admin", userRouter);
mainRouter.use("/role", roleRouter);
// mainRouter.use("/super-admin", superAdminRouter);

module.exports = mainRouter;
