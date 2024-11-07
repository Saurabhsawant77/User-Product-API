const express = require("express");
const productRouter = require("./productRoute");
const userRouter = require("./userRoute");
const superAdminRouter = require("./superAdminRouter");
const authRouter = require("./auth");
const adminRouter = require("./adminRouter");

const mainRouter = express.Router();

// mainRouter.use("/admin",adminRouter)
mainRouter.use("/auth", authRouter);
// mainRouter.use("/super-admin", superAdminRouter);

module.exports = mainRouter;
