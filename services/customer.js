const Partner = require("../models/partner");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const createCustomer = async (userData) => {
  const hashedPassword = await bcryptjs.hash(userData.password, 10);
  const newUser = new User({
    ...userData,
    password: hashedPassword,
  });
  return await newUser.save();
};

const getAllCustomer = async () => {
  return await User.find({}).populate("role");
};



module.exports = { createCustomer, getAllCustomer };
