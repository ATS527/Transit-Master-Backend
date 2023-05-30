const Admin = require("../models/user_model");
const sendToken = require("../utils/jwtToken")
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const role = "admin";

        const admin = await Admin.findOne({
            email: email,
        });

        if (admin) {
            res.status(400).json({
                success: false,
                message: "Email already exists",
            });
            return;
        }

        const adminCreated = new Admin({
            username: username,
            email: email,
            password: password,
            role: role,
        });

        await adminCreated.save()
            .then((result) => {
                sendToken(result, 201, res);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: "Admin creation failed",
                    error: error,
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Admin creation failed",
            error: err,
        });
    }
};

exports.getAllAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.find({
            role: "admin",
        });

        res.status(200).json({
            success: true,
            message: "Get all admins success",
            admins: admins,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Get all admins failed",
            error: err,
        });
    }
};

exports.loginAdmin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const admin = await Admin.findOne({
            email: email,
        });

        if (!admin) {
            res.status(404).json({
                success: false,
                message: "Admin not found",
            });
            return;
        }

        const isPasswordMatched = bcrypt.compareSync(password, admin.password);

        if (!isPasswordMatched) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }

        sendToken(admin, 200, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: err
        })
    }
};

exports.logoutAdmin = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            Credentials: true,
            sameSite: "none",
            secure: true
        });

        res.status(200).json({
            success: true,
            message: "Log out success",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Log out failed",
            error: err,
        });
    }
};

exports.getCurrentlyLoggedinAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.find({
            _id: req.user._id,
        });

        if (!admin) {
            res.status(401).json({
                success: false,
                message: "Admin not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: admin,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        })
    }
}

exports.deleteAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findOneAndDelete({
            email: req.params.email
        }).then((result) => {
            res.status(200).json({
                success: true,
                message: "Admin deleted successfully",
            });
        }).catch(err => {
            console.log(err);
            res.status(200).json({
                success: true,
                message: err.message
            })
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
        });
    }
}