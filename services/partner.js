const Partner = require("../models/partner");
const bcryptjs = require("bcryptjs");

const createPartner = async (userData) => {
  const hashedPassword = await bcryptjs.hash(userData.password, 10);
  const newUser = new Partner({
    ...userData,
    password: hashedPassword,
  });
  return await newUser.save();
};

const getAllPartner = async () => {
  return await Partner.find({}).populate("role");
};

const updatePartner = async (req, res) => {};

module.exports = { createPartner, getAllPartner };
