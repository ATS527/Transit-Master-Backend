const BusDetails = require("../models/bus_details");

exports.createBus = async (req, res) => {
    try {
        const bus_depot = req.body.bus_depot;
        const bus_number = req.body.bus_number;
        const total_seats = req.body.total_seats;

        const bus = await BusDetails.findOne({
            bus_number: bus_number,
        });

        if (bus) {
            res.status(400).json({
                success: false,
                message: "Bus already exists",
            });
            return;
        }

        const busCreated = new BusDetails({
            bus_depot: bus_depot,
            bus_number: bus_number,
            total_seats: total_seats,
            status: "active",
        });

        await busCreated.save()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    message: "Bus created successfully",
                    data: result,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: "Bus creation failed",
                    error: error,
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

exports.getAllBuses = async (req, res) => {
    try {
        const buses = await BusDetails.find();

        res.status(200).json({
            success: true,
            message: "Get all buses success",
            data: buses,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Get all buses failed",
            error: err,
        });
    }
}

// exports.getBusByBusNumber = async (req, res) => {
//     try {
//         const bus = await BusDetails.findOne({
//             bus_number: req.params.id,
//         });

//         if (!bus) {
//             res.status(404).json({
//                 success: false,
//                 message: "Bus not found",
//             });
//             return;
//         }

//         res.status(200).json({
//             success: true,
//             message: "Get bus by bus number success",
//             data: bus,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: "Get bus by bus number failed",
//             error: err,
//         });
//     }
// }

exports.updateBusByBusNumber = async (req, res) => {
    try {
        const bus = await BusDetails.findOne({
            bus_number: req.body.bus_number,
        });

        if (!bus) {
            res.status(404).json({
                success: false,
                message: "Bus not found",
            });
            return;
        }

        bus.bus_depot = req.body.bus_depot;
        bus.total_seats = req.body.total_seats;

        await bus.save();

        res.status(200).json({
            success: true,
            message: "Update bus by bus number success",
            data: bus,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Update bus by bus number failed",
            error: err,
        });
    }
}

exports.deleteBusByBusNumber = async (req, res) => {
    try {
        const bus = await BusDetails.findOne({
            _id: req.params.id,
        });

        if (!bus) {
            res.status(404).json({
                success: false,
                message: "Bus not found",
            });
            return;
        }

        await BusDetails.deleteOne({
            _id: req.params.id,
        });

        res.status(200).json({
            success: true,
            message: "Delete bus by bus number success",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Delete bus by bus number failed",
            error: err,
        });
    }
}

exports.getAllBusesDynamic = async (req, res) => {
    try {
        const status = req.query.status;
        const bus_depot = req.query.bus_depot;

        const buses = await BusDetails.find({
            status: status,
            bus_depot: bus_depot,
        });

        res.status(200).json({
            success: true,
            message: "Get all buses dynamic success",
            data: buses,
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Get all buses dynamic failed",
            error: err,
        });
    }
}