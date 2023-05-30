const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    route_id: {
        type: String,
        primaryKey: true
    },
    bus_type: {
        type: String,
    },
    route: {
        route_from : {
            type: String,
        },
        route_to : {
            type: String,
        },
        time_from : {
            type: Date,
        },
        time_to : {
            type: Date,
        }
    },
    route_stops: [{
        stop_name: {
            type: String,
        },
        stop_time: {
            type: Date,
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

routeSchema.pre("save", function(next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

module.exports = mongoose.model("RouteDetails", routeSchema);