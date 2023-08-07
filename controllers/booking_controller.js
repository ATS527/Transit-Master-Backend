const BookingDetails = require("../models/booking_details");
const BusRoute = require("../models/bus_route_details");
const RouteDetails = require("../models/route_details");
const NFCCard = require("../models/nfc_details");

exports.showAvailableRoutes = async (req, res) => {
    try {
        const busRoutes = await BusRoute.find();

        var routes = [];

        for (let i = 0; i < busRoutes.length; i++) {
            const route = await RouteDetails.findOne({
                _id: busRoutes[i].route_id
            }).populate("route_from route_to route_stops.stop_id");

            var data = {
                bus_route_id: busRoutes[i]._id,
                seating_availability: busRoutes[i].seating_availability,
                current_location: busRoutes[i].current_location.stop_name,
                route,
            }

            routes.push(data);
        }

        res.status(200).json({
            success: true,
            message: "Get available routes success",
            routes: routes,
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

exports.bookBusRoute = async (req, res) => {
    try {

        const bus_route = await BusRoute.findOne({
            _id: req.body.bus_route_id
        });

        if (!bus_route) {
            res.status(404).json({
                success: false,
                message: "Bus route not found",
            });
            return;
        }

        var data = {
            user_id: req.user._id,
            bus_route_id: req.body.bus_route_id,
            getin_stop: req.body.getin_stop,
            getout_stop: req.body.getout_stop,
        };

        const route = await RouteDetails.findOne({
            _id: bus_route.route_id
        });

        const route_stops = route.route_stops;

        var depart_index = -1;
        var destination_index = -1;
        for (let i = 0; i < route_stops.length; i++) {
            if (route_stops[i].stop_id.equals(data.getin_stop)) {
                depart_index = i;
            }

            if (route_stops[i].stop_id.equals(data.getout_stop)) {
                destination_index = i;
            }
        }
        var amount = (destination_index - depart_index) * route.price_per_stop;
        data = {
            ...data,
            amount: amount,
        }


        await NFCCard.findOne({ user_id: req.user._id })
            .then((result => {
                if (!result) {
                    res.status(404).json({
                        success: false,
                        message: "NFC card not found",
                    });
                    return;
                }

                if (parseInt(result.balance) < amount) {
                    console.log(err);
                    res.status(400).json({
                        success: false,
                        message: "Insufficient balance",
                    });
                    return;
                }

                result.balance = parseInt(result.balance) - amount;
                result.save()
                    .then(() => {
                        BookingDetails.create(data)
                            .then(result => {
                                if (bus_route.current_location.equals(data.getin_stop)) {
                                    bus_route.seating_availability -= 1;
                                    bus_route.save().catch(err => {
                                        console.log(err);

                                        res.status(500).json({
                                            success: false,
                                            message: err.message
                                        });
                                    });
                                }

                                res.status(200).json({
                                    success: true,
                                    message: "Booking success",
                                    data: result,
                                });
                            })
                            .catch(err => {
                                console.log(err);

                                res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            });
                    })
                    .catch(err => {
                        console.log(err);

                        res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    });
            }))
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
        })
    }
}

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await BookingDetails.find({
            user_id: req.user._id
        }).populate("getin_stop getout_stop");
        res.status(200).json({
            success: true,
            message: "Get user bookings success",
            bookings: bookings,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
        })
    }
}

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await BookingDetails.find().populate("getin_stop getout_stop user_id bus_route_id");

        res.status(200).json({
            success: true,
            message: "Get all bookings success",
            bookings: bookings,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.verifyBookingWithNFC = async (req, res) => {
    try {
        const nfcard = await NFCCard.findOne({
            card_id: req.query.card_id
        });

        if (!nfcard) {
            res.status(404).json({
                success: false,
                message: "NFC card not found",
            });
            return;
        }

        if (nfcard.is_valid === false) {
            res.status(400).json({
                success: false,
                message: "NFC card is invalid",
            });
            return;
        }

        const booking = await BookingDetails.findOne({
            user_id: nfcard.user_id,
            status: "booked",
        });

        if (!booking) {
            res.status(404).json({
                success: false,
                message: "Booking not found",
            });
            return;
        }

        await BookingDetails.updateOne({user_id: nfcard.user_id}, {status: "generated"}).then(result => {
            res.status(200).json({
                success: true,
                result,
                message: "Verify booking success",
            });
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}