const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger  = require("../wrapper/logger");
const User  = require("../models/roleBaseModel");


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
  console.log("Checking....")
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

const handleGetUserById = async (req,res) =>{
  console.log("Inside handleGetUserById")
    try {
        const id = req.params.id;
        const user = await User.findById(id);
    
    
        if(!user){
            logger.error('handleGetUserById :: User not found');
            return res.status(404).json({message : "User not found"});
        }
        else{
            logger.info('User Fetched Successfully');
            return res.status(200).json(user);
        }
    } catch (error) {
        console.log(error + " Error  in handleGetUserById");
        logger.error('handleGetUserById :: Internal server error',error);
        return res.status(500).json({message : `Internal server error`});
    }
  
}

const handleUpdateUserById = async (req,res) =>{
  // console.log("updated by :: ");
    try {
        const  id = req.params.id;
        const updatedBy = req.user._id;
        // console.log(req.user._id + " :: ")
        const updateUser = await User.findById(id);
        if(!updateUser){
            logger.error('handleUpdateUserById :: User not found');
            return res.status(404).json({message : "User not found"})
        }
        else{
            req.body.updatedBy = updatedBy;
            const updatedData = await User.findByIdAndUpdate(req.params.id,req.body,{ new: true }); 
            logger.info('User Updated Successfully');
            return res.status(200).json({message : "success",user:updatedData});
        }
        
    } catch (error) {
        // console.log(error + " Error in handleUpdateUserById");
        logger.error('handleUpdateUserById :: Internal server error',error);
        return res.status(500).json({message : `Internal server error`});
    }

}


module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleAddUser,
};
