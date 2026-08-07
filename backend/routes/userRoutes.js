// import express from "express";

// import protect from "../middlewares/authMiddleware.js";
// import authorizeRoles from "../middlewares/authorizeRoles.js";

// const router = express.Router();

// /*
// |--------------------------------------------------------------------------
// | Parent / Student / Teacher / Admin
// |--------------------------------------------------------------------------
// */

// router.get(
//   "/profile",
//   protect,
//   (req, res) => {
//     res.status(200).json({
//       success: true,
//       message: "Protected Route Accessed Successfully",
//       user: req.user,
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | Admin Only
// |--------------------------------------------------------------------------
// */

// router.get(
//   "/admin",
//   protect,
//   authorizeRoles("admin"),
//   (req, res) => {
//     res.json({
//       success: true,
//       message: "Welcome Admin",
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | Teacher Only
// |--------------------------------------------------------------------------
// */

// router.get(
//   "/teacher",
//   protect,
//   authorizeRoles("teacher"),
//   (req, res) => {
//     res.json({
//       success: true,
//       message: "Welcome Teacher",
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | Parent Only
// |--------------------------------------------------------------------------
// */

// router.get(
//   "/parent",
//   protect,
//   authorizeRoles("parent"),
//   (req, res) => {
//     res.json({
//       success: true,
//       message: "Welcome Parent",
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | Student Only
// |--------------------------------------------------------------------------
// */

// router.get(
//   "/student",
//   protect,
//   authorizeRoles("student"),
//   (req, res) => {
//     res.json({
//       success: true,
//       message: "Welcome Student",
//     });
//   }
// );

// export default router;


import express from "express";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

import validate from "../middlewares/validate.js";

import {
  createUserValidation,
  updateUserValidation,
  updateRoleValidation,
  updateStatusValidation,
} from "../validators/userValidator.js";

import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
  getMyProfile,
} from "../controllers/userController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Current Logged-in User
|--------------------------------------------------------------------------
*/

router.get(
  "/profile",
  protect,
  getMyProfile
);

/*
|--------------------------------------------------------------------------
| Admin User Management
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getSingleUser
);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createUserValidation,
  validate,
  createUser
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateUserValidation,
  validate,
  updateUser
);

router.patch(
  "/:id/role",
  protect,
  authorizeRoles("admin"),
  updateRoleValidation,
  validate,
  updateUserRole
);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  updateStatusValidation,
  validate,
  updateUserStatus
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

export default router;