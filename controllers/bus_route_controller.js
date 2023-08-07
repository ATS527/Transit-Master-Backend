const BusRoute = require("../models/bus_route_details");
const BookingDetails = require("../models/booking_details");
const Bus = require("../models/bus_details");
const Route = require("../models/route_details");
const StopDetails = require("../models/bus_route_details");

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

        Route.findOne({
            _id: req.body.route_id
        }).then(result1 => {
            Bus.findOne({
                _id: req.body.bus_id
            })
                .then(result2 => {
                    const busRouteCreated = new BusRoute({
                        bus_id: req.body.bus_id,
                        route_id: req.body.route_id,
                        current_location: result1.route_stops[0].stop_id,
                        seating_availability: result2.total_seats
                    });

                    busRouteCreated.save()
                        .then((result3) => {
                            res.status(200).json({
                                success: true,
                                message: "Bus route created successfully",
                                data: result3,
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
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        success: false,
                        message: "Server error",
                        error: err,
                    });
                });


        }).catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error",
                error: err,
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
        const busRoutes = await BusRoute.find().populate("current_location");

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
        const busRoute = await BusRoute.findById(req.params.id).populate("bus_id").populate("route_id").populate("current_location");

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
            BusRoute.updateOne({ _id: req.params.id }, { $set: req.body })
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
            BusRoute.deleteOne({ _id: req.params.id })
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

exports.incrementStop = async (req, res) => {
    try {
        const bus_route = await BusRoute.findOne({
            _id: req.body.bus_route_id
        });

        const bookings = await BookingDetails.find({
            bus_route_id: req.body.bus_route_id
        });

        if (!bus_route) {
            res.status(404).json({
                success: false,
                message: "Bus route not found",
            });
            return;
        }

        const route = await Route.findOne({
            _id: bus_route.route_id
        });

        const route_stops = route.route_stops;

        for (var i = 0; i < route_stops.length; i++) {
            if (route_stops[i].stop_id.equals(bus_route.current_location)) {
                if (i == route_stops.length - 1) {
                    res.status(200).json({
                        success: true,
                        message: "Bus already reached the destination!",
                        bus_route: bus_route,
                    });
                    return;
                } else {
                    bus_route.current_location = route_stops[i + 1].stop_id;
                    for (var j = 0; j < bookings.length; j++) {
                        if (bookings[j].getin_stop.equals(bus_route.current_location)) {
                            bus_route.seating_availability -= 1;
                        }

                        if (bookings[j].getout_stop.equals(bus_route.current_location)) {
                            bus_route.seating_availability += 1;
                        }
                    }

                    await bus_route.save();
                    break;
                }
            }
        }

        res.status(200).json({
            success: true,
            message: "Increment stop success",
            bus_route: bus_route,
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

exports.getCurrentStop = async (req, res) => {
    try {
        BusRoute.findOne({
            _id: req.params.id
        }).populate("current_location").then(result => {
            if(!result) {
                res.status(404).json({
                    success: false,
                    message: "Bus route not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Get current stop success",
                current_location_name: result.current_location.stop_name,
                current_location_address: result.current_location.stop_address,
                current_location_coordinates: result.current_location.stop_coordinates,
                current_seating_availability: result.seating_availability,
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error",
                error: err,
            });
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