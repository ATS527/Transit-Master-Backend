const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    bus_route_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "BusRoute",
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    getin_stop: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "StopDetail",
    },
    getout_stop: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "StopDetail",
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

bookingSchema.pre("save", function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    this.status = "booked";
    next();
});

module.exports = mongoose.model("BookingDetail", bookingSchema);