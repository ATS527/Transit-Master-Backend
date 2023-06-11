const NFCCardRequests = require("../models/nfc_card_requests");
const ClientDetails = require("../models/client_details");
const NFCCard = require("../models/nfc_details");

exports.createNFCCardRequest = async (req, res, next) => {
    try {
        const userDetails = await ClientDetails.findOne({
            user_id: req.user.id,
        });

        if (!userDetails) {
            res.status(404).json({
                success: false,
                message: "User details not found",
            });
            return;
        }

        const requestCheck = await NFCCardRequests.findOne({
            user_id: req.user._id,
        });

        if (requestCheck) {
            res.status(404).json({
                success: false,
                message: "Request already exists",
            });
            return;
        }

        const request = await NFCCardRequests.create({
            user_id: req.user._id,
            is_student: userDetails.is_student,
        });

        res.status(200).json({
            success: true,
            message: "Request created successfully",
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.getAllNFCCardClientRequests = async (req, res, next) => {
    try {
        const requests = await NFCCardRequests.find({
            is_student: false,
        });

        if (!requests) {
            res.status(404).json({
                success: false,
                message: "No requests found",
            });
            return;
        }

        const result = [];

        for (var i = 0; i < requests.length; i++) {
            var map = {
                request: requests[i],
                details: await ClientDetails.findOne({
                    user_id: requests[i].user_id,
                }),
            }
            console.log(map);
            result.push(map)
        }

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.getAllNFCCardStudentRequests = async (req, res, next) => {
    try {
        const requests = await NFCCardRequests.find({
            is_student: true,
        }).populate("user_id");

        if (!requests) {
            res.status(404).json({
                success: false,
                message: "No requests found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: requests,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.getNFCCardRequestDetailed = async (req, res, next) => {
    try {
        const request = await NFCCardRequests.findOne({
            _id: req.params.id,
        }).populate("user_id", "-__v");

        if (!request) {
            res.status(404).json({
                success: false,
                message: "Request not found",
            });
            return;
        }

        const clientDetails = await ClientDetails.findOne({
            user_id: request.user_id,
        },"-__v");

        res.status(200).json({
            success: true,
            data: request,
            clientDetails
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.validateNFCCardRequest = async (req, res, next) => {
    try {
        const request = await NFCCardRequests.findOne({
            _id: req.params.id,
        });

        const userDetails = await ClientDetails.findOne({
            user_id: request.user_id,
        });

        if (!request) {
            res.status(404).json({
                success: false,
                message: "Request not found",
            });
            return;
        }

        request.is_validated = true;

        await request.save();

        await NFCCard.create({
            user_id: userDetails.user_id,
            balance: 10,
            is_valid: true,
        });

        res.status(200).json({
            success: true,
            message: "Request validated successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.getCurrentStatusOfNFCRequest = async (req, res) => {
    try {
        
        const request = await NFCCardRequests.findOne({
            user_id: req.user._id,
        });

        if (!request) {
            res.status(404).json({
                success: false,
                message: "Request not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: request,
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
