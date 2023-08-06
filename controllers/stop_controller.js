const StopModel = require("../models/stop_details");

exports.createStop = async (req, res) => {
    try {

        const { stop_name, stop_coordinates, stop_address } = req.body;

        StopModel.create({
            stop_name: stop_name,
            stop_coordinates: stop_coordinates,
            stop_address: stop_address
        }).then((result) => {
            res.status(200).json({
                success: true,
                result
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: err
            })
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err,
        });
    }
}

exports.getAllStops = async (req, res) => {
    try {
        StopModel.find()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    result
                });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: err
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err,
        });
    }
}

exports.updateStop = async (req, res) => {
    try {
        StopModel.updateOne({ _id: req.params.id }, { $set: req.body })
            .then((result) => {
                res.status(200).json({
                    success: true,
                    message: "Stop updated successfully",
                    data: result,
                });
            })
            .catch((err) => {
                console.log(err);

                res.status(500).json({
                    success: false,
                    message: err.message
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err,
        });
    }
}

exports.deleteStop = async (req, res) => {
    try {
        StopModel.deleteOne({ _id: req.params.id })
            .then((result) => {
                res.status(200).json({
                    success: true,
                    message: "Stop deleted successfully",
                    data: result,
                });
            })
            .catch((err) => {
                console.log(err);

                res.status(500).json({
                    success: false,
                    message: err.message
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err,
        });
    }
}
