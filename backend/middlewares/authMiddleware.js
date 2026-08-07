import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token;

    /*
    |--------------------------------------------------------------------------
    | Read Token from Cookie
    |--------------------------------------------------------------------------
    */

    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    /*
    |--------------------------------------------------------------------------
    | Read Token from Authorization Header
    |--------------------------------------------------------------------------
    */

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    /*
    |--------------------------------------------------------------------------
    | No Token
    |--------------------------------------------------------------------------
    */

   if (!token && req.cookies?.refreshToken) {

    try {

        const decoded = jwt.verify(
            req.cookies.refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.refreshToken !== req.cookies.refreshToken) {
            throw new Error("Invalid refresh token");
        }

        token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "Session expired.",
        });

    }

}
    /*
    |--------------------------------------------------------------------------
    | Verify Token
    |--------------------------------------------------------------------------
    */

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    /*
    |--------------------------------------------------------------------------
    | Get User
    |--------------------------------------------------------------------------
    */

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });

  }
};

export default protect;