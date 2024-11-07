const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const createUser = async (userData) => {
  const hashedPassword = await bcryptjs.hash(userData.password, 10);
  const newUser = new User({
    ...userData,
    password: hashedPassword,
  });
  return await newUser.save();
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email }).populate('role');
};
 

module.exports = {
  createUser,
  getUserByEmail,
  
};
