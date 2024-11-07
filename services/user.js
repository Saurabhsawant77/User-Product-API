const User = require("../models/user");

const getAllUsers = async () => {
  return await User.find({}).populate("role");
};

module.exports = {
  getAllUsers,
};
