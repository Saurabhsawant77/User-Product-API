const express = require("express");

const authRouter = require("./auth");
const userRouter = require("./user");
const roleRouter = require("./role");
const partnerRouter = require("./partner");
const productRouter = require("./product");

const mainRouter = express.Router();

// mainRouter.use("/admin",adminRouter)
mainRouter.use("/auth", authRouter);
mainRouter.use("/admin", userRouter);
mainRouter.use("/role", roleRouter);
mainRouter.use("/partner", partnerRouter);
mainRouter.use("/product", productRouter);
// mainRouter.use("/super-admin", superAdminRouter);

module.exports = mainRouter;
