const StationMaster = require("../models/user_model");
const sendToken = require("../utils/jwtToken")
const bcrypt = require("bcryptjs");

exports.createStationMaster = async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const role = "station-master";

        const stationMaster = await StationMaster.findOne({
            email: email,
        });

        if (stationMaster) {
            res.status(400).json({
                success: false,
                message: "Email already exists",
            });
            return;
        }

        const stationMasterCreated = new StationMaster({
            username: username,
            email: email,
            password: password,
            role: role,
        });

        await stationMasterCreated.save()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    message: "Station Master created successfully",
                    stationMaster: result,
                })
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: "Station Master creation failed",
                    error: error,
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Station Master creation failed",
            error: err,
        });
    }
};

exports.getAllStationMasters = async (req, res, next) => {
    try {
        const stationMasters = await StationMaster.find({
            role: "station-master",
        });

        res.status(200).json({
            success: true,
            message: "Get all station masters success",
            stationMasters: stationMasters,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Get all station master failed",
            error: err,
        });
    }
};

exports.loginStationMaster = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const stationMaster = await StationMaster.findOne({
            email: email,
        });

        if (!stationMaster) {
            res.status(404).json({
                success: false,
                message: "Station Master not found",
            });
            return;
        }

        const isPasswordMatched = bcrypt.compareSync(password, stationMaster.password);

        if (!isPasswordMatched) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }

        sendToken(stationMaster, 200, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: err
        })
    }
};

exports.logoutStationMaster = async (req, res, next) => {
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

exports.getCurrentlyLoggedinStationMaster = async (req, res, next) => {
    try {
        const stationMaster = await StationMaster.find({
            _id: req.user._id,
        },"-password");

        if (!stationMaster) {
            res.status(401).json({
                success: false,
                message: "Station Master not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: stationMaster,
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

exports.deleteStationMaster = async (req, res, next) => {
    try {
        const stationMaster = await StationMaster.findOneAndDelete({
            email: req.params.email
        }).then((result) => {
            res.status(200).json({
                success: true,
                message: "Station Master deleted successfully",
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