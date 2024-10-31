const User = require('../models/userSchema');
const  bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../middleware/logger');


const handleSignUp = async (req,res) =>{
    console.log("inside handle Signup")
    try {
        const {name, email, password, phone, address, createdBy, updatedBy} = req.body;

        //check user exist or not
        console.log("Name is " + name );
        const existingUser = await User.findOne({email});
        const  existingUser2 = await User.findOne({phone});
        console.log(existingUser);
        if(existingUser || existingUser2){
            logger.error('User already exists',existingUser);
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcryptjs.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            createdBy,
            updatedBy
        });

        // const token = await jwt.sign(
        //     {userID:newUser._id, email:newUser.email},
        //     process.env.JWT_SECRET,
        //     { expiresIn: '1h' }
        // );
        logger.info("handleSignUp :: User Created Successfullyy");
        return res.status(201).json({message : "User Created Successfully",user : newUser});

    } catch (error) {
        console.log("Error in Signup",error);
        logger.error(`Internal server error ${error}`);
        return res.status(501).json({message: `Internal server error ${error}`});
    }
}

const handleLogin = async (req,res) =>{
    try {

        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            logger.error('handleSignUp :: Invalid Email or Password',user);
            return res.status(400).json({message : "Invalid Email or Password"});
        }

        //check password is valid or not

        const isPasswordValid = await bcryptjs.compare(password,user.password);

        if(!isPasswordValid){
            logger.error('Invalid Email or Password');
            return  res.status(400).json({message : "Invalid Email or Password"});
        }

        const token = jwt.sign(
            {userID:user._id, email:user.email},
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        )

        // res.setHeader('Authorization',`Bearer ${token}`);
        logger.info("handleLogin :: UserLogged in Successfully");
        res.status(200).json({message : "Login Successfull",token});

        
    } catch (error) {
        console.error(error);
        logger.error('handleLogin :: Internal server error');
        res.status(500).json({ message: 'Internal server error' });
    }
}

const handleAddUser = async (req,res) =>{
    try {
        const {name, email, password, phone, address, createdBy, updatedBy} = req.body;

        //check user exist or not
        console.log(name);
        const existingUser = await User.findOne({email});
        console.log(existingUser);
        if(existingUser){
            logger.error('User already exists');
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcryptjs.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            createdBy : req.user.userID ,
            updatedBy : req.user.userID
        });
        logger.info("handleAddUser :: User Added Successfully");
        return res.status(201).json({message : "User Added Successfully",addedUser : newUser});
    } catch (error) {
        logger.error('handleAddUser :: Internal server error ',error);
        return res.status(501).json({message: `Internal server error ${error}`});
    }
} 

const handleGetAllUsers = async (req,res) =>{
    try{
        const allUsers = await User.find({});
        if(!allUsers){
            logger.error('handleGetAllUsers :: No users found');
            return res.status(404).json({message : "No users found"});
        }
        logger.info('Users Fetched Successfully');
        return res.status(200).json(allUsers);
    }
    catch (error){
        logger.error('handleGetAllUsers :: Internal server error',error);
        return res.status(500).json({message : `Internal server error ${error}`});
    }

}

const handleGetUserById = async (req,res) =>{

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
        return res.status(500).json({message : `Internal server error ${error}`});
    }
  
}

const handleUpdateUserById = async (req,res) =>{

    try {
        const  id = req.params.id;
        const updateUser = await User.findById(id);
        if(!updateUser){
            logger.error('handleUpdateUserById :: User not found');
            return res.status(404).json({message : "User not found"})
        }
        else{
            const updatedData = await User.findByIdAndUpdate(req.params.id,req.body,{new : true}); 
            logger.info('User Updated Successfully');
            return res.json({message : "success",updataedUser :updatedData});
        }
        
    } catch (error) {
        // console.log(error + " Error in handleUpdateUserById");
        logger.error('handleUpdateUserById :: Internal server error',error);
        return res.status(500).json({message : `Internal server error ${error}`});
    }

}


module.exports = {
    handleLogin,
    handleSignUp,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleAddUser
}
