// import User from "../models/User.js";

// /*
// |--------------------------------------------------------------------------
// | Get All Users
// |--------------------------------------------------------------------------
// */

// export const getUsers = async (req, res) => {

//     try {

//         const users = await User.find(
//             {},
//             "firstName lastName email role avatar"
//         ).sort({
//             firstName: 1,
//         });

//         res.status(200).json({

//             success: true,

//             count: users.length,

//             data: users,

//         });

//     } catch (error) {

//         res.status(500).json({

//             success: false,

//             message: error.message,

//         });

//     }

// };


import bcrypt from "bcryptjs";
import User from "../models/User.js";

/*
|--------------------------------------------------------------------------
| Get Logged-in User Profile
|--------------------------------------------------------------------------
*/

export const getMyProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -refreshToken");

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single User
|--------------------------------------------------------------------------
*/

export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Create User (Admin)
|--------------------------------------------------------------------------
*/

export const createUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update User
|--------------------------------------------------------------------------
*/

export const updateUser = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.firstName =
      req.body.firstName ?? user.firstName;

    user.lastName =
      req.body.lastName ?? user.lastName;

    user.email =
      req.body.email ?? user.email;

    user.phoneNumber =
      req.body.phoneNumber ?? user.phoneNumber;

    user.avatar =
      req.body.avatar ?? user.avatar;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update User Role
|--------------------------------------------------------------------------
*/

export const updateUserRole = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.role = req.body.role;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User role updated successfully.",
      user,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Activate / Deactivate User
|--------------------------------------------------------------------------
*/

export const updateUserStatus = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.isActive = req.body.isActive;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `User ${
        user.isActive ? "activated" : "deactivated"
      } successfully.`,
      user,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

export const deleteUser = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};