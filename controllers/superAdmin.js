const User = require("../models/userSchema");

const bcryptjs = require("bcryptjs");

const logger = require("../wrapper/logger");
const Role = require("../models/roleSchema");

const handleAddAdminUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const roleDocument = await Role.findOne({ role_type: role });
    if (!roleDocument) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });

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
      createdBy: roleDocument._id,
      updatedBy: roleDocument._id,
    });
    newUser.save();
    logger.info("handleAddUser :: User Added Successfully");

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

const handleGetAllAdminUsers = async (req, res) => {
  try {
    const allAdminUsers = await User.find({}).populate("role");
    if (!allAdminUsers) {
      logger.error("handleGetAllUsers :: No users found");
      return res.status(404).json({ message: "No users found" });
    }
    logger.info("Users Fetched Successfully");
    return res.status(200).json(allAdminUsers);
  } catch (error) {
    logger.error("handleGetAllUsers :: Internal server error", error);
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

module.exports = {
  handleAddAdminUser,
  handleGetAllAdminUsers,
};
