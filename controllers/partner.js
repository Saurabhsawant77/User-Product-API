const Partner = require("../models/partner");
const Role = require("../models/role");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { createUser } = require("../services/auth");
const {
  createPartner,
  getAllPartner,
  getAllPartnerAddedByAdmin,
} = require("../services/partner");
const { getAllAdmin } = require("../services/user");
const EnumtypeOfRole = require("../wrapper/enums");
const logger = require("../wrapper/logger");
const sendCredentialEmail = require("../wrapper/sendCredentials");

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
    const token = jwt.sign(
      { _id: newUser._id, role: newUser.role.role_name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    console.log(newUser);
    sendCredentialEmail(newUser,password,token);

    logger.info("handleAddPartner :: User Created Successfullyy");
    return res
      .status(201)
      .json({ message: "Partner Created Successfully",token :token, admin: newUser });
  } catch (error) {
    console.log("Error in Partner", error);
    logger.error(`Internal server error ${error}`);
    return res.status(501).json({ message: `Internal server error ${error}` });
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
  handleAddPartner,
  handleGetAllPartnersAddedByAdmin,
};
