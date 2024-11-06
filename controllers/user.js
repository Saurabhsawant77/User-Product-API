const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../wrapper/logger");

const nodemailer = require("nodemailer");
const User = require("../models/userSchema");
const EnumtypeOfRole = require("../wrapper/enums");
const { object } = require("joi");
const Role = require("../models/roleSchema");

const sendMailForgetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "navin.rajbhar@wybrid.com",
        pass: "vwks ffdg sgzs hzrz",
      },
    });

    const mailOptions = {
      from: "rahul234@wybrid.com",
      to: "navin22338@gmail.com",
      subject: "Test Email from Nodemailer",

      html: ` <a href="http://localhost:3030/api/auth/forget-password/${req.user._id}/${token}">http://localhost:3030/api/auth/forget-password/${req.user._id}/${token}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    return res.status(200).json({ message: "email send successful" });
  } catch (error) {
    logger.error("sendMailForgetPassword :: Internal server error");
    return res.status(200).json({ message: "error" });
  }
};

//forget password
const handleForgotPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    const user = await User.findById(req.user._id);
    console.log(user);

    if (!user) {
      logger.error("handleForgotPassword :: User not found");
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await bcryptjs.hash(newPassword, 10); // Hash the new password
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const handleAddAdminUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      logger.error("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: roleDocument._id,
    });
    newUser.save();
    logger.info("handleAddUser :: User Added Successfully");
    console.log(newUser);

    return res
      .status(201)
      .json({ message: "User Added Successfully", newUser: newUser });
  } catch (error) {
    logger.error("Internal server error handleAddUser", error);
    return res
      .status(501)
      .json({ message: "Internal server error handleAddUser", error: error });
  }
};

const handleGetAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (!allUsers) {
      logger.error("handleGetAllUsers :: No users found");
      return res.status(404).json({ message: "No users found" });
    }
    logger.info("Users Fetched Successfully");
    return res.status(200).json(allUsers);
  } catch (error) {
    logger.error("handleGetAllUsers :: Internal server error", error);
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

const handleGetUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      logger.error("handleGetUserById :: User not found");
      return res.status(404).json({ message: "User not found" });
    } else {
      logger.info("User Fetched Successfully");
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error + " Error  in handleGetUserById");
    logger.error("handleGetUserById :: Internal server error", error);
    return res.status(500).json({ message: `Internal server error` });
  }
};

const handleUpdateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await User.findById(id);
    if (!updateUser) {
      logger.error("handleUpdateUserById :: User not found");
      return res.status(404).json({ message: "User not found" });
    } else {
      const updatedData = await User.findByIdAndUpdate(req.params.id, req.body);
      logger.info("User Updated Successfully");
      return res.json({ message: "success" });
    }
  } catch (error) {
    // console.log(error + " Error in handleUpdateUserById");
    logger.error("handleUpdateUserById :: Internal server error", error);
    return res.status(500).json({ message: `Internal server error` });
  }
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleAddAdminUser,

  handleForgotPassword,
  sendMailForgetPassword,
};
