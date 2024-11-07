const Partner = require("../models/partner");
const Role = require("../models/role");
const { createPartner, getAllPartner } = require("../services/partner");
const logger = require("../wrapper/logger");

const handleAddPartner = async (req, res) => {
  try {
    const { username, email, password, role, phone, address, isActive } =
      req.body;
    console.log(phone, address);

    const roleDocument = await Role.findOne({ role_name: role });
    console.log("roleDocument", roleDocument);

    if (!roleDocument) {
      return res.status(400).json({ message: "Role not found" });
    }

    const existingUser = await Partner.findOne({ email });

    console.log(existingUser);
    if (existingUser) {
      logger.error("User already exists", existingUser);
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await createPartner({
      username,
      email,
      password,
      role: roleDocument._id,
      phone,
      owner_id: req.user ? req.user._id : null,
      address,
      isActive,
      profileImage: req.file.path,
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
    const allPartner = await getAllPartner();
    console.log("data", allPartner);

    if (!allUsers) {
      logger.error("handleGetAllPartner :: No users found");
      return res.status(404).json({ message: "No users found" });
    }
    logger.info("Users Fetched Successfully");
    return res.status(200).json(allUsers);
  } catch (error) {
    logger.error("handleGetAllPartner :: Internal server error", error);
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

module.exports = { handleGetAllPartner, handleAddPartner };
