const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const createAdmin = async (userData) => {
  const hashedPassword = await bcryptjs.hash(userData.password, 10);
  const newUser = new User({
    ...userData,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  await savedUser.populate('role');
  return savedUser;
  

};

const getAllAdmin = async () => {
  return await User.find({}).populate("role");
};

module.exports = {
  createAdmin,
  getAllAdmin,
};
