const User = require("../models/userSchema");
const bcryptjs = require('bcryptjs');

const createUser = async (userData) => {
    const hashedPassword = await bcryptjs.hash(userData.password, 10);
    const newUser = new User({
        ...userData,
        password: hashedPassword
    });
    return await newUser.save();
};

const getAllUsers = async () => {
    return await User.find({});
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const updateUserById = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    getUserByEmail
};