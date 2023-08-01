const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    bus_type: {
        type: String,
    },
    depot: {
        type: String,
    },
    route_from: {
        type: String,
    },
    route_to: {
        type: String,
    },
    time_from: {
        type: String,
    },
    time_to: {
        type: String,
    },
    route_stops: [{
        stop_name: {
            type: String,
        },
        stop_time: {
            type: String,
        },
    }],
    price_per_km: {
        type: Number,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

routeSchema.pre("save", function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

module.exports = mongoose.model("RouteDetails", routeSchema);