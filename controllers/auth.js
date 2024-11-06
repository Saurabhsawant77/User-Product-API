const User = require("../models/userSchema");
const EnumtypeOfRole = require("../wrapper/enums");
const logger = require("../wrapper/logger");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//signup
const handleSignUp = async (req, res) => {
  console.log("inside handleSignUp");
  try {
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      logger.error("User already exists", userEmail);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    newUser.save();

    logger.info("handleSignUp :: User Created Successfullyy");
    return res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log("Error in Signup", error);
    logger.error("Internal server error handleSignUp");
    return res.status(501).json({ message: "Internal server error" });
  }
};

//login
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      logger.error("Invalid Email or Password");
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    //check password is valid or not

    const isPasswordValid = await bcryptjs.compare(
      password,
      userExist.password
    );

    if (!isPasswordValid) {
      logger.error("Invalid Email or Password");
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { _id: userExist._id, role: userExist.role, email: userExist.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // res.setHeader('Authorization',`Bearer ${token}`);
    logger.info("handleLogin :: UserLogged in Successfully");
    res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    console.error(error);
    logger.error("handleLogin :: Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
};

//admin login
const handleAdminLogin = async (req, res) => {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      logger.error("Invalid Email or Password");
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      {
        _id: process.env.ADMIN_ID,
        email: ADMIN_EMAIL,
        role: EnumtypeOfRole.SUPER_ADMIN,
      },

      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // res.setHeader('Authorization',`Bearer ${token}`);
    logger.info("handleLogin :: UserLogged in Successfully");
    res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    console.error(error);
    logger.error("handleLogin :: Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
};

//reset password
const handleResetPassword = async (req, res) => {
  try {
    const { email } = req.user;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      logger.error("Invalid User");
      return res.status(400).json({ message: "Invalid User" });
    }

    //Check old password is correct
    const isPasswordValid = await bcryptjs.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      logger.error("Invalid Old Password");
      return res.status(400).json({ message: "Invalid Old Password" });
    }

    user.password = await bcryptjs.hash(newPassword, 10); // Hash the new password
    await user.save();

    logger.info("handleResetPassword :: Password reset successful");
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    logger.error("handleResetPassword :: Internal server error");
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

module.exports = {
  handleSignUp,
  handleLogin,
  handleResetPassword,
  handleAdminLogin,
};
