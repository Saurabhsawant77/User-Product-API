const express = require("express");

const authRouter = express.Router();


authRouter.post("/signup",handleSignup)
authRouter.post("/login",handleLogin)

module.exports = authRouter;
