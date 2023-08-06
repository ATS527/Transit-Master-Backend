const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Please Login for access this resource",
        });
        return;
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findOne({ _id: decodedData.id });
    next();
};

// Admin Roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(500).json({
                success: false,
                message: "You are not allowed to access this resource",
            });
        };
        next();
    }
}