const Partner = require("../models/partner");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const createPartner = async (userData) => {
  const hashedPassword = await bcryptjs.hash(userData.password, 10);
  const newUser = new Partner({
    ...userData,
    password: hashedPassword,
  });
  return await newUser.save();
};

const getAllPartner = async () => {
  return await User.find({}).populate("role");
};

// const updatePartner = async (req, res) => {};


const getAllPartnerAddedByAdmin = async (req) => {
  return await User.find({createdBy : req.user._id}).populate("role");
};


module.exports = { createPartner, getAllPartner, getAllPartnerAddedByAdmin };
