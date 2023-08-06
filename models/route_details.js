const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    bus_type: {
        type: String,
    },
    depot: {
        type: String,
    },
    route_from: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "StopDetail",
    },
    route_to: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "StopDetail",
    },
    time_from: {
        type: String,
    },
    time_to: {
        type: String,
    },
    route_stops: [{
        _id: false,
        stop_time: {
            type: String,
        },
        stop_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "StopDetail"
        }
    }],
    price_per_stop: {
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

module.exports = mongoose.model("RouteDetail", routeSchema);