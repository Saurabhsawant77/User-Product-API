const logger = require("../wrapper/logger");
const Role = require("../models/role");
const User = require("../models/user");
const { createAdmin, getAllAdmin } = require("../services/user");
const EnumtypeOfRole = require("../wrapper/enums");
const { getAllPartner } = require("../services/partner");
const { getAllCustomer } = require("../services/customer");
const jwt = require("jsonwebtoken");
const sendCredentialEmail = require("../wrapper/sendCredentials");

const handleAddAdmin = async (req, res) => {
  try {
    console.log("Inside handle Add admin");
    const { username, email, password, role, phone, address } = req.body;
    console.log(phone, address);

    const roleDocument = await Role.findOne({ role_name: role });
    console.log("roleDocument", roleDocument);

    if (!roleDocument) {
      return res.status(400).json({ message: "Role not found" });
    }

    const existingUser1 = await User.findOne({ email });
    const existingUser2 = await User.findOne({ phone });

    if(existingUser1 && existingUser2){
      logger.error("User already exists", existingUser1);
      return res.status(400).json({ message: "User email & phone already exists" });
    }
    else if (existingUser1) {
      logger.error("User already exists", existingUser1);
      return res.status(400).json({ message: "User email already exists" });
    }
    else if(existingUser2){
      logger.error("User already exists", existingUser2);
      return res.status(400).json({ message: "User phone already exists" });
    }

    const newUser = await createAdmin({
      username,
      email,
      password,
      role: roleDocument._id,
      phone,
      address,
      createdBy: req.user ? req.user._id : null,
      updatedBy: req.user ? req.user._id : null,
    });
    newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, role: newUser.role.role_name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    console.log(newUser);
    sendCredentialEmail(newUser,password,token);

    logger.info("handleAddUser :: User Created Successfullyy");
    return res.status(201).json({ message: "admin Created Successfully",token: token, admin: newUser });
  } catch (error) {
    console.log("Error in admin", error);
    logger.error(`Internal server error ${error}`);
    return res.status(501).json({ message: `Internal server error ${error}` });
  }
};

const handleGetAllAdmin = async (req, res) => {
  try {
    const data = await getAllAdmin();
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

const handleGetAllPartner = async (req, res) => {
  try {
    const data = await getAllPartner();
    console.log("data", data);

    const allUsers = await data.filter(
      (data, id) => data.role.role_name === EnumtypeOfRole.PARTNER
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

const handleGetAllCustomer = async (req, res) => {
  try {
    const data = await getAllCustomer();
    console.log("data", data);

    const allUsers = await data.filter(
      (data, id) => data.role.role_name === EnumtypeOfRole.CUSTOMER
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

module.exports = {
  handleGetAllAdmin,
  handleGetAllPartner,
  handleGetAllCustomer,
  handleGetUserById,
  handleUpdateUserById,
  handleAddAdmin,
};
