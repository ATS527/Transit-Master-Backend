const mongoose = require("mongoose");
const Route = require("./route_details");
const Bus = require("./bus_details");

const busRouteSchema = new mongoose.Schema({
    bus_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "BusDetail",
    },
    route_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "RouteDetail",
    },
    seating_availability: {
        type: Number,
    },
    current_location: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "StopDetail",
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

busRouteSchema.pre("save", function(next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

module.exports = mongoose.model("BusRoute", busRouteSchema);