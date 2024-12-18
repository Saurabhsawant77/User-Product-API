const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const createUser = async (userData) => {
  const hashedPassword = await bcryptjs.hash(userData.password, 10);
  const newUser = new User({
    ...userData,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  await savedUser.populate('role');
  return savedUser;  
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email }).populate('role');
};
 

module.exports = {
  createUser,
  getUserByEmail,
};
