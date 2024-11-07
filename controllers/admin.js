const bcryptjs = require("bcryptjs");

const logger = require("../wrapper/logger");
const Role = require("../models/roleSchema");
const Partner = require("../models/partnerSchema");
const User = require("../models/userSchema");

const handleAddPartner = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.user);

    const roleDocument = await Role.findOne({ role_type: role });

    if (!roleDocument) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingPartner = await Partner.findOne({ email: email });

    if (existingPartner) {
      logger.error("Partner already exists");
      return res.status(400).json({ message: "Partner already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newPartner = await Partner.create({
      name,
      email,
      password: hashedPassword,
      owner_id: req.user._id,
      profileImage: req.file.path,
      role: roleDocument._id,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });
    newPartner.save();
    logger.info("handleAddPartner :: Partner Added Successfully");

    return res
      .status(201)
      .json({ message: "Partner Added Successfully", newPartner: newPartner });
  } catch (error) {
    logger.error("Internal server error handleAddPartner", error);
    return res.status(501).json({
      message: "Internal server error handleAddPartner",
      error: error,
    });
  }
};

const handleGetAllPartners = async (req, res) => {
  try {
    const AllPartners = await Partner.find({}).populate("role");
    if (!AllPartners) {
      logger.error("handleGetAllPartners :: No Partner found");
      return res.status(404).json({ message: "No Partner found" });
    }
    logger.info("Partners Fetched Successfully");
    return res.status(200).json(AllPartners);
  } catch (error) {
    logger.error("handleGetAllPartners :: Internal server error", error);
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

module.exports = {
  handleAddPartner,
  handleGetAllPartners,
};
