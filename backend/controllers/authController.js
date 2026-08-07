import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../services/emailService.js";

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

export const registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    } = req.body;

    // Check existing email
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Create account
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,

      // PUBLIC USERS CAN ONLY REGISTER AS PARENT
      role: "parent",

      isVerified: false,
      isActive: true,
      refreshToken: "",
    });

    // Generate Tokens
    const token = generateToken(user._id);

    const refreshToken =
      generateRefreshToken(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;

    await user.save();

    // Cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Registration Successful.",

      token,

      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

export const loginUser = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Find User
    |--------------------------------------------------------------------------
    */

const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Compare Password
    |--------------------------------------------------------------------------
    */

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Generate Token
    |--------------------------------------------------------------------------
    */

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();
    /*
    |--------------------------------------------------------------------------
    | Cookie
    |--------------------------------------------------------------------------
    */
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 15 * 60 * 1000,
});

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  }
};



export const logoutUser = async (req, res, next) => {
  try {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(200).json({
        success: true,
        message: "Already Logged Out",
      });
    }

    const user = await User.findOne({
      refreshToken,
    });

    if (user) {
      user.refreshToken = "";

      await user.save();
    }

    res.clearCookie("token");

    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logout Successful",
    });

  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found.",
      });
    }

    // Verify Refresh Token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // Find User
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Ensure token matches database
    if (user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token.",
      });
    }

    // Generate new Access Token
    const accessToken = generateToken(user._id);

    // Update Cookie
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Token Refreshed Successfully",
      token: accessToken,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Current Logged-in User
|--------------------------------------------------------------------------
*/

export const getCurrentUser = async (req, res) => {

    try {

        res.status(200).json({

            success: true,

            user: req.user,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
*/

export const forgotPassword = async(req,res,next)=>{


try{


const {email}=req.body;



const user = await User.findOne({email});



if(!user){

return res.status(404).json({

success:false,

message:"User not found."

});

}




const resetToken = crypto
.randomBytes(32)
.toString("hex");



user.resetPasswordToken = crypto
.createHash("sha256")
.update(resetToken)
.digest("hex");



user.resetPasswordExpire =
Date.now() + 15 * 60 * 1000;



await user.save();





const resetUrl =

`${process.env.CLIENT_URL}/portal/reset-password/${resetToken}`;





await sendPasswordResetEmail({
    email: user.email,
    resetUrl,
});




res.status(200).json({

success:true,

message:"Password reset link sent."

});



}catch(error){

next(error);

}


};

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/


export const resetPassword = async(req,res,next)=>{


try{


const hashedToken = crypto

.createHash("sha256")

.update(req.params.token)

.digest("hex");





const user = await User.findOne({

resetPasswordToken:hashedToken,

resetPasswordExpire:{
    $gt:Date.now()
}

});




if(!user){

return res.status(400).json({

success:false,

message:"Invalid or expired token."

});

}


/*
|--------------------------------------------------------------------------
| Validate New Password
|--------------------------------------------------------------------------
*/

const { password } = req.body;

if (!password || password.length < 8) {
  return res.status(400).json({
    success: false,
    message: "Password must be at least 8 characters.",
  });
}

const salt = await bcrypt.genSalt(12);

user.password = await bcrypt.hash(
  password,
  salt
);

user.passwordChangedAt = new Date();


user.refreshToken = "";

user.resetPasswordToken = null;
user.resetPasswordExpire = null;
user.refreshToken = "";



await user.save();





res.status(200).json({

success:true,

message:"Password reset successful."

});



}catch(error){

next(error);

}


};