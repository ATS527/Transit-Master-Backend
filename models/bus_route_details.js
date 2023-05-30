const mongoose = require("mongoose");

const busRouteSchema = new mongoose.Schema({
    bus_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "BusDetails",
    },
    route_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "RouteDetails",
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