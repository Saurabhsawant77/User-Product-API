const User = require('../models/userSchema');
const  bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const handleSignUp = async (req,res) =>{
    console.log("inside handle Signup")
    try {
        const {name, email, password, phone, address, createdBy, updatedBy} = req.body;

        //check user exist or not
        console.log(name);
        const existingUser = await User.findOne({email});
        console.log(existingUser);
        if(existingUser){
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

        return res.status(201).json({message : "User Created Successfully"});

    } catch (error) {
        console.log("Error in Signup",error);
        return res.status(501).json({message: 'Internal server error'});
    }
}

const handleLogin = async (req,res) =>{
    try {

        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message : "Invalid Email or Password"});
        }

        //check password is valid or not

        const isPasswordValid = await bcryptjs.compare(password,user.password);

        if(!isPasswordValid){
            return  res.status(400).json({message : "Invalid Email or Password"});
        }

        const token = jwt.sign(
            {userID:user._id, email:user.email},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        // res.setHeader('Authorization',`Bearer ${token}`);

        res.status(200).json({message : "Login Successfull",token});

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const handleGetAllUsers = async (req,res) =>{
    const allUsers = await User.find({});
    return res.status(200).json(allUsers);
}

const handleGetUserById = async (req,res) =>{
    const id = req.params.id;
    const user = await User.findById(id);


    if(!user){
        return res.status(404).json({message : "User not found"});
    }
    else{
        return res.status(200).json(user);
    }
}

const handleUpdateUserById = async (req,res) =>{
    const  id = req.params.id;
    const updateUser = await User.findById(id);
    if(!updateUser){
        return res.status(404).json({message : "User not found"})
    }
    else{
        const updatedData = await User.findByIdAndUpdate(req.params.id,req.body); 
        return res.json({message : "success"});
    }
}








module.exports = {
    handleLogin,
    handleSignUp,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById
}
