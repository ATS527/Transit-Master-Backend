const BusRoute = require("../models/bus_route_details");

exports.createBusRoute = async (req, res) => {
    try {
        const bus_route = await BusRoute.findOne({
            bus_id: req.body.bus_id,
            route_id: req.body.route_id,
        });

        if (bus_route) {
            res.status(400).json({
                success: false,
                message: "Bus route already exists",
            });
            return;
        }

        const busRouteCreated = new BusRoute({
            bus_number: req.body.bus_number,
            route_id: req.body.route_id,
        });

        await busRouteCreated.save()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    message: "Bus route created successfully",
                    data: result,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: "Bus route creation failed",
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

exports.getAllBusRoutes = async (req, res) => {
    try {
        const busRoutes = await BusRoute.find();

        res.status(200).json({
            success: true,
            message: "Get all bus routes success",
            busRoutes: busRoutes,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Get all bus routes failed",
            error: err,
        });
    }
}

exports.getBusRouteById = async (req, res) => {
    try {
        const busRoute = await BusRoute.findById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Get bus route by id success",
            busRoute: busRoute,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Get bus route by id failed",
            error: err,
        });
    }
}

exports.updateBusRouteById = async (req, res) => {
    try {
        const busRoute = await BusRoute.findById(req.params.id);

        if (busRoute) {
            busRoute.bus_id = req.body.bus_id;
            busRoute.route_id = req.body.route_id;

            await busRoute.save()
                .then((result) => {
                    res.status(200).json({
                        success: true,
                        message: "Bus route updated successfully",
                        data: result,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: "Bus route updation failed",
                        error: error,
                    });
                });
        } else {
            res.status(404).json({
                success: false,
                message: "Bus route not found",
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Bus route updation failed",
            error: err,
        });
    }
}

exports.deleteBusRouteById = async (req, res) => {
    try {
        const busRoute = await BusRoute.findById(req.params.id);

        if (busRoute) {
            await busRoute.remove()
                .then((result) => {
                    res.status(200).json({
                        success: true,
                        message: "Bus route deleted successfully",
                        data: result,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: "Bus route deletion failed",
                        error: error,
                    });
                });
        } else {
            res.status(404).json({
                success: false,
                message: "Bus route not found",
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Bus route deletion failed",
            error: err,
        });
    }
}