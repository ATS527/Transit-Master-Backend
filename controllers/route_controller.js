const RouteDetails = require("../models/route_details");

exports.createRoute = async (req, res) => {
    const { bus_type, depot, route_from, route_to, time_from, time_to, route_stops, price_per_km } = req.body;

    try {
        RouteDetails.create({
            bus_type: bus_type,
            depot: depot,
            route_from: route_from,
            route_to: route_to,
            time_from: time_from,
            time_to: time_to,
            route_stops: route_stops,
            price_per_km: price_per_km,
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

exports.getAllRoutes = async (req, res) => {
    try {
        RouteDetails.find()
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

exports.updateRoute = async (req, res) => {
    try {
        const { bus_type, bus_depot, route_from, route_to, time_from, time_to, route_stops, price_per_km } = req.body;
        RouteDetails.updateOne({ "_id": req.params.id }, {
            bus_depot: bus_depot,
            bus_type: bus_type,
            route_from: route_from,
            route_to: route_to,
            time_from: time_from,
            time_to: time_to,
            route_stops: route_stops,
            price_per_km: price_per_km,
        })
            .then((result) => {
                res.status(200).json({
                    success: true,
                    result
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

exports.deleteRoute = async (req, res) => {
    try {
        const route_id = req.params.id;

        RouteDetails.deleteOne({
            _id: route_id
        }).then((result) => {
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
