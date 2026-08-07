// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication required",
//       });
//     }

//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. You do not have permission.",
//       });
//     }

//     next();
//   };
// };

// export default authorizeRoles;


/*
|--------------------------------------------------------------------------
| Role Authorization Middleware
|--------------------------------------------------------------------------
| This middleware ensures that only users with the required roles
| can access protected routes.
|--------------------------------------------------------------------------
*/

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    /*
    |--------------------------------------------------------------------------
    | Ensure User is Authenticated
    |--------------------------------------------------------------------------
    */

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Ensure User Has a Role
    |--------------------------------------------------------------------------
    */

    if (!req.user.role) {
      return res.status(403).json({
        success: false,
        message: "User role is not assigned.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Check if User Role is Allowed
    |--------------------------------------------------------------------------
    */

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. "${req.user.role}" is not authorized to perform this action.`,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Authorized
    |--------------------------------------------------------------------------
    */

    next();
  };
};

export default authorizeRoles;