const Role = require("../models/role");
const User = require("../models/user");
const { createUser, getUserByEmail } = require("../services/auth");

const EnumtypeOfRole = require("../wrapper/enums");
const logger = require("../wrapper/logger");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../wrapper/sendEmail");

//signup
const handleSignUp = async (req, res) => {
  console.log("inside handle Signup");
  try {
    let { username, email, password, role, phone, address } = req.body;

    if (role === undefined || !role) {
      role = EnumtypeOfRole.CUSTOMER;
    }

    const roleDocument = await Role.findOne({ role_name: role });
    console.log("roleDocument", roleDocument);

    if (!roleDocument) {
      return res.status(400).json({ message: "Role not found" });
    }

    const existingUser1 = await User.findOne({ email });
    const existingUser2 = await User.findOne({ phone });

    if (existingUser1 || existingUser2) {
      logger.error("User already exists", existingUser1 || existingUser2);
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await createUser({
      username,
      email,
      password,
      role: roleDocument._id,
      phone,
      address,
      createdBy: req.user ? req.user._id : null,
      updatedBy: req.user ? req.user._id : null,
    });

    logger.info("handleSignUp :: User Created Successfullyy");
    return res.status(201).json({
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Error in Signup", error);
    logger.error(`Internal server error ${error}`);
    return res.status(501).json({ message: `Internal server error ${error}` });
  }
};

//login
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await getUserByEmail(email);
    console.log(userExist);

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
      {
        _id: userExist._id,
        role: userExist.role.role_name,
        email: userExist.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // res.setHeader('Authorization',`Bearer ${token}`);
    logger.info("handleLogin :: UserLogged in Successfully");
    res.status(200).json({ message: "Login Successfull", token , user:userExist });
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
    const user = await getUserByEmail(email);

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

const verifyEmailForgetPassword = async (req, res) => {
  try {
    console.log("Inside this");
    const { email } = req.body;
    if (!email) {
      logger.error("handleForgetPassword :: Email not found");
      return res.status(400).json({ message: "Email not found" });
    }

    console.log("handleForgetPassword :: ", req.body);
    const user = await User.findOne({ email: email }).populate("role");
    console.log(user);
    if (!user) {
      logger.error("handleForgetPassword :: User not found");
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role.role_name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    sendEmail(user, token);

    return res.status(200).json({ message: "success", token: token , user : user});
  } catch (error) {
    console.log(error);
  }
};

const handleResetForgotPassword = async (req, res) => {
  try {
    console.log("inside handleResetForgotPassword");
    const { email } = req.user;
    const { newPassword } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      logger.error("handleResetForgotPassword :: User not found");
      return res.status(400).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedResetForgotPassword = await bcryptjs.hash(newPassword, 10);

    await User.updateOne(
      { _id: user._id },
      { password: hashedResetForgotPassword, otp: null, otpExpiry: null }
    );

    logger.info("handleResetForgotPassword :: Password reset successful");
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    logger.error("handleResetForgotPassword :: Internal server error");
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  handleSignUp,
  handleLogin,
  handleResetPassword,
  verifyEmailForgetPassword,
  handleResetForgotPassword,
};
