const bcryptjs = require("bcryptjs");

const logger = require("../wrapper/logger");

const nodemailer = require("nodemailer");

const Role = require("../models/role");
const { createUser } = require("../services/auth");
const User = require("../models/user");
const { getAllUsers } = require("../services/user");
const EnumtypeOfRole = require("../wrapper/enums");

const handleAddUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const roleDocument = await Role.findOne({ role_name: role });
    console.log("roleDocument", roleDocument);

    if (!roleDocument) {
      return res.status(400).json({ message: "Role not found" });
    }

    const existingUser = await User.findOne({ email });

    console.log(existingUser);
    if (existingUser) {
      logger.error("User already exists", existingUser);
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await createUser({
      username,
      email,
      password,
      role: roleDocument._id,
      createdBy: req.user ? req.user._id : null,
      updatedBy: req.user ? req.user._id : null,
    });

    logger.info("handleAddUser :: User Created Successfullyy");
    return res
      .status(201)
      .json({ message: "admin Created Successfully", admin: newUser });
  } catch (error) {
    console.log("Error in admin", error);
    logger.error(`Internal server error ${error}`);
    return res.status(501).json({ message: `Internal server error ${error}` });
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

const handleGetAllAdmin = async (req, res) => {
  try {
    const data = await getAllUsers();
    console.log("data", data);

    const allUsers = await data.filter(
      (data, id) => data.role.role_name === EnumtypeOfRole.ADMIN
    );

    console.log("allUsers", allUsers);

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
  handleGetAllAdmin,
  handleGetUserById,
  handleUpdateUserById,
  handleAddAdminUser,
  handleAddUser,
};
