const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger  = require("../wrapper/logger");
const User  = require("../models/roleBaseModel");

const handleSignUp = async (req, res) => {
  console.log("inside handleSignUp");
  try {
    const { username, email, password, role, isActive } = req.body;

    // Check if the user already exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      logger.error("User already exists", userEmail);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "customer_user",
      isActive: isActive || true,
      createdBy: req.user ? req.user._id : null,
    });

    await newUser.save();
    logger.info("handleSignUp :: User Created Successfully");
    return res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log("Error in Signup", error);
    logger.error("Internal server error in handleSignUp:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      logger.error("Invalid Email or Password", userExist);
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    //check password is valid or not

    const isPasswordValid = await bcryptjs.compare(
      password,
      userExist.password
    );

    if (!isPasswordValid) {
      logger.error("Invalid Email or Password");
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { _id: userExist._id, role: userExist.role, email: userExist.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // res.setHeader('Authorization',`Bearer ${token}`);
    logger.info("handleLogin :: UserLogged in Successfully");
    res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    console.error(error);
    logger.error("handleLogin :: Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
};

//reset password
const handleResetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    //Check old password is correct
    const isPasswordValid = await bcryptjs.compare(
      oldPassword,
      userExist.password
    );

    if (!isPasswordValid) {
      logger.error("Invalid Email or Password");
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    user.password = await bcryptjs.hash(newPassword, 10); // Hash the new password

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

const handleAddUser = async (req, res) => {
  try {
    const { username, email, password, role, isActive } = req.body;

    //check user exist or not

    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      logger.error("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User({
      username,
      email,
      password: hashedPassword,
      role: role || "customer_user",
      isActive: isActive || true,
      createdBy: req.user ? req.user._id : null,
    });
    logger.info("handleAddUser :: User Added Successfully");
    return res.status(201).json({ message: "User Added Successfully" });
  } catch (error) {
    logger.error("Internal server error handleAddUser", error);
    return res
      .status(501)
      .json({ message: "Internal server error handleAddUser" });
  }
};

const handleGetAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (!allUsers) {
      logger.error("handleGetAllUsers :: No users found");
      return res.status(404).json({ message: "No users found" });
    }
    logger.info("Users Fetched Successfully");
    return res.status(200).json(allUsers);
  } catch (error) {
    logger.error("handleGetAllUsers :: Internal server error", error);
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

const handleGetUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      logger.error("handleGetUserById :: User not found");
      return res.status(404).json({ message: "User not found" });
    } else {
      logger.info("User Fetched Successfully");
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error + " Error  in handleGetUserById");
    logger.error("handleGetUserById :: Internal server error", error);
    return res.status(500).json({ message: `Internal server error` });
  }
};

const handleUpdateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await User.findById(id);
    if (!updateUser) {
      logger.error("handleUpdateUserById :: User not found");
      return res.status(404).json({ message: "User not found" });
    } else {
      const updatedData = await User.findByIdAndUpdate(req.params.id, req.body);
      logger.info("User Updated Successfully");
      return res.json({ message: "success" });
    }
  } catch (error) {
    // console.log(error + " Error in handleUpdateUserById");
    logger.error("handleUpdateUserById :: Internal server error", error);
    return res.status(500).json({ message: `Internal server error` });
  }
};

module.exports = {
  handleLogin,
  handleSignUp,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleAddUser,
  handleResetPassword,
};
