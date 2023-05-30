const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
    bus_dippo: {
        type: String,
    },
    bus_number: {
        type: String,
        required: true,
    },
    total_seats: {
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

busSchema.pre("save", function(next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

module.exports = mongoose.model("BusDetails", busSchema);