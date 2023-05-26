const Client = require("../models/user_model");
const ClientDetails = require("../models/client_details");
const sendToken = require("../utils/jwtToken")
const bcrypt = require("bcryptjs");

const server_url = process.env.SERVER_URL || "http://localhost:3000/client_documents/";

exports.createClient = async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const role = "client";

        const client = await Client.findOne({
            email: email,
        });

        if (client) {
            res.status(400).json({
                success: false,
                message: "Email already exists",
            });
            return;
        }

        const clientCreated = new Client({
            username: username,
            email: email,
            password: password,
            role: role,
        });

        await clientCreated.save()
            .then((result) => {
                sendToken(result, 201, res);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: "client creation failed",
                    error: error,
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "client creation failed",
            error: err,
        });
    }
};

exports.createClientDetails = async (req, res, next) => {
    try {
        const clientDetails = await ClientDetails.create({
            user_id: req.body.client_id,
            full_name: req.body.full_name,
            phone_number: req.body.phone_number,
            address: req.body.address,
            pin_code: req.body.pin_code,
            nearest_dippo: req.body.nearest_dippo,
        });

        if(req.files) {
            if(req.files.income_certificate) {
                clientDetails.income_certificate_link = server_url + req.files.income_certificate[0].filename;
            }
            if(req.files.aadhar) {
                clientDetails.aadhar_link = server_url + req.files.aadhar[0].filename;
            }
            if(req.files.ration_card) {
                clientDetails.ration_card_link = server_url + req.files.ration_card[0].filename;
            }
            await clientDetails.save();
        }

        res.status(201).json({
            success: true,
            message: "client details created",
            clientDetails: clientDetails,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "client details creation failed",
            error: err,
        });
    }
}

exports.getClientDetailsById = async (req, res, next) => {
    const id = req.params.id;

    try {
        // get the client details by the id and populate the user_id field and omit the password field
        const clientDetails = await ClientDetails.findOne({
            user_id: id,
        }).populate("user_id", "-password -_id __v");

        if (!clientDetails) {
            res.status(404).json({
                success: false,
                message: "Client not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Get client by id success",
            clientDetails: clientDetails,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Get client by id failed",
            error: err,
        });
    }
}

exports.getAllClients = async (req, res, next) => {
    try {
        const clientDetails = await ClientDetails.find().populate("user_id","-password -__v");

        res.status(200).json({
            success: true,
            message: "Get all clients success",
            clients: clientDetails,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Get all clients failed",
            error: err,
        });
    }
};

exports.loginClient = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const client = await Client.findOne({
            email: email,
        });

        if (!client) {
            res.status(404).json({
                success: false,
                message: "Client not found",
            });
            return;
        }

        const isPasswordMatched = bcrypt.compareSync(password, client.password);

        if (!isPasswordMatched) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }

        sendToken(client, 200, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: err
        })
    }
};

exports.logoutClient = async (req, res, next) => {
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

exports.getCurrentlyLoggedinClient = async (req, res, next) => {
    try {
        const client = await Client.find({
            _id: req.user._id,
        }, "-password");

        if (!client) {
            res.status(401).json({
                success: false,
                message: "client not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: client,
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

exports.deleteClient = async (req, res, next) => {
    try {
        const client = await ClientDetails.deleteOne({
            user_id: req.params.id
        }).then(async (result) => {
            await Client.deleteOne({
                _id: req.params.id
            });
            res.status(200).json({
                success: true,
                message: "Client deleted successfully",
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