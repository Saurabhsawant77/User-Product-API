const Partner = require("../models/partner");
const Role = require("../models/role");
const User = require("../models/user");
const { createUser } = require("../services/auth");
const {
  createPartner,
  getAllPartner,
  getAllPartnerAddedByAdmin,
} = require("../services/partner");
const { getAllAdmin } = require("../services/user");
const EnumtypeOfRole = require("../wrapper/enums");
const logger = require("../wrapper/logger");

const handleAddPartner = async (req, res) => {
  try {
    const { username, email, password, role, phone, address } = req.body;

    const roleDocument = await Role.findOne({ role_name: role });

    if (!roleDocument) {
      return res.status(400).json({ message: "Role not found" });
    }

    const existingUser = await User.findOne({ email });
    console.log(roleDocument, existingUser);
    if (existingUser) {
      logger.error("User already exists", existingUser);
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("Inside handle addd");
    const newUser = await createUser({
      username,
      email,
      password,
      role: roleDocument._id,
      phone,
      owner_id: req.user ? req.user._id : null,
      address,
      // profileImage: req.file.path,
      createdBy: req.user ? req.user._id : null,
      updatedBy: req.user ? req.user._id : null,
    });
    newUser.save();
    console.log(newUser);

    logger.info("handleAddPartner :: User Created Successfullyy");
    return res
      .status(201)
      .json({ message: "Partner Created Successfully", admin: newUser });
  } catch (error) {
    console.log("Error in Partner", error);
    logger.error(`Internal server error ${error}`);
    return res.status(501).json({ message: `Internal server error ${error}` });
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

const handleGetAllPartnersAddedByAdmin = async (req, res) => {
  try {
    const allPartner = await getAllPartnerAddedByAdmin(req);
    console.log("data", allPartner);

    if (!allPartner) {
      logger.error("handleGetAllPartner :: No users found");
      return res.status(404).json({ message: "No users found" });
    }
    logger.info("Users Fetched Successfully");
    return res.status(200).json(allPartner);
  } catch (error) {
    logger.error("handleGetAllPartner :: Internal server error", error);
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

module.exports = {
  handleGetAllPartner,
  handleAddPartner,
  handleGetAllPartnersAddedByAdmin,
};
