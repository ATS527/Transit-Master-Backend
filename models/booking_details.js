const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    bus_id: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    route_id: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    getin_stop: {
        type: String,
    },
    getout_stop: {
        type: String,
    },
    amount: {
        type: Number,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

bookingSchema.pre("save", function(next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

module.exports = mongoose.model("BookingDetails", bookingSchema);