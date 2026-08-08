import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        let token = null;

        /*
        |--------------------------------------------------------------------------
        | 1. Read Access Token from Authorization Header FIRST
        |--------------------------------------------------------------------------
        |
        | This must have priority over an old/stale cookie.
        |
        */

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        /*
        |--------------------------------------------------------------------------
        | 2. If no Authorization token, read Access Token Cookie
        |--------------------------------------------------------------------------
        */

        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        /*
        |--------------------------------------------------------------------------
        | 3. Try Access Token
        |--------------------------------------------------------------------------
        */

        if (token) {
            try {
                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

                const user = await User.findById(
                    decoded.id
                ).select("-password");

                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: "User not found.",
                    });
                }

                req.user = user;

                return next();
            } catch (accessTokenError) {
                /*
                |--------------------------------------------------------------------------
                | Access token is invalid/expired.
                |
                | We continue below and try the refresh token.
                |--------------------------------------------------------------------------
                */
            }
        }

        /*
        |--------------------------------------------------------------------------
        | 4. Try Refresh Token
        |--------------------------------------------------------------------------
        */

        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | 5. Verify Refresh Token
        |--------------------------------------------------------------------------
        */

        let decodedRefresh;

        try {
            decodedRefresh = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
            );
        } catch (refreshError) {
            res.clearCookie("token");
            res.clearCookie("refreshToken");

            return res.status(401).json({
                success: false,
                message: "Session expired.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | 6. Find User
        |--------------------------------------------------------------------------
        */

        const user = await User.findById(
            decodedRefresh.id
        ).select("-password");

        if (!user) {
            res.clearCookie("token");
            res.clearCookie("refreshToken");

            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | 7. Make Sure Refresh Token Matches Database
        |--------------------------------------------------------------------------
        */

        if (user.refreshToken !== refreshToken) {
            res.clearCookie("token");
            res.clearCookie("refreshToken");

            return res.status(401).json({
                success: false,
                message: "Invalid refresh token.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | 8. Create New Access Token
        |--------------------------------------------------------------------------
        */

        const newAccessToken = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        );

        /*
        |--------------------------------------------------------------------------
        | 9. Save New Access Token Cookie
        |--------------------------------------------------------------------------
        */

        res.cookie("token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        /*
        |--------------------------------------------------------------------------
        | 10. Attach User to Request
        |--------------------------------------------------------------------------
        */

        req.user = user;

        /*
        |--------------------------------------------------------------------------
        | 11. Continue
        |--------------------------------------------------------------------------
        */

        return next();

    } catch (error) {
        console.error(
            "Authentication middleware error:",
            error
        );

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

export default protect;
