const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../wrapper/logger");
const User = require("../models/roleBaseModel");
const { sendEmail } = require("../wrapper/sendEmail");
// const { generatePassword } = require("../wrapper/generatePassword");
// const crypto = require('crypto');

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

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            role,
            createdBy,
            updatedBy
        });

        // const token = await jwt.sign(
        //     {userID:newUser._id, email:newUser.email},
        //     process.env.JWT_SECRET,
        //     { expiresIn: '1h' }
        // );
        logger.info("handleSignUp :: User Created Successfullyy");
        return res.status(201).json({ message: "User Created Successfully" });

    } catch (error) {
        console.log("Error in Signup", error);
        logger.error('Internal server error handleSignUp');
        return res.status(501).json({ message: 'Internal server error' });
    }
}

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            logger.error('Invalid Email or Password');
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
        const {email} = req.user;
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({
            email:email
        });

        if(!user){
            logger.error("Invalid User");
            return res.status(400).json({message : "Invalid User"});
        }

        //Check old password is correct
        const isPasswordValid = await bcryptjs.compare(
            oldPassword,
            user.password
        );

        if (!isPasswordValid) {
            logger.error("Invalid Email or Password");
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        user.password = await bcryptjs.hash(newPassword, 10); // Hash the new password
        await user.save();

        logger.info("handleResetPassword :: Password reset successful");
        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        logger.error("handleResetPassword :: Internal server error");
        res.status(500).json({ message: "Internal server error", error: error });
    }
};


const handleForgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email){
            logger.error("handleForgetPassword :: Email not found");
            return res.status(400).json({ message: "Email not found" })
        }

        console.log("handleForgetPassword :: ", req.body);
        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
            logger.error("handleForgetPassword :: User not found");
            return res.status(400).json({ message: "User not found" })
        }

        // const otp = crypto.randomInt(100000, 999999).toString();
        // const otpExpiry = Date.now() + 10 * 60 * 1000;
        // await User.updateOne({ _id: user._id }, { otp, otpExpiry });

        const token = jwt.sign(
            { _id: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );
        sendEmail(user,token);

        return res.status(200).json({ message: "success",token : token });
    }
    catch (error) {
        console.log(error)
    }
}

// const handleVerifyPassword = async (req, res) => {
//     try {
//         const { email, otp } = req.body;
//         const user = await User.findOne({ email });
//         console.log(user);
//         if (!user) {
//             logger.error("handleVerifyPassword :: User not found");
//             return res.status(400).json({ message: "User not found" })
//         }
//         console.log("Hello Before OTP EXPIRY");
//         if (user.otpExpiry < Date.now()) {
//             logger.error("handleVerifyPassword :: OTP expired");
//             return res.status(400).json({ message: "OTP expired" })
//         }
//         if (user.otp != otp) {
//             logger.error("handleVerifyPassword :: OTP is incorrect");
//             return res.status(400).json({ message: "OTP is incorrect" })
//         }
//         await User.updateOne({ _id: user._id }, { otp : null, otpExpiry : null });
//         return res.status(200).json({ message: "success" });
//     }
//     catch (error) {
//         logger.error(`handleVerifyPassword :: OTP is incorrect - ${error}`);
//         console.log(`handleVerifyPassword :: OTP is incorrect - ${error}`);
//     }
// }

const handleResetForgotPassword = async (req, res) => {
    try {
      const { email } = req.user;
      const {newPassword} = req.body;
      const user = await User.findOne({ email : email });
      console.log(user)
      if (!user) {
        logger.error("handleResetForgotPassword :: User not found");
        return res.status(400).json({ message: "User not found" });
      }
  
      // Hash the new password
      const hashedResetForgotPassword = await bcryptjs.hash(newPassword, 10);

      await User.updateOne({ _id: user._id }, {password : hashedResetForgotPassword, otp : null, otpExpiry : null });

  
      logger.info("handleResetForgotPassword :: Password reset successful");
      return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      logger.error("handleResetForgotPassword :: Internal server error");
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  


module.exports = {
    handleSignUp,
    handleLogin,
    handleResetPassword,
    handleForgetPassword,
    // handleVerifyPassword,
    handleResetForgotPassword
}