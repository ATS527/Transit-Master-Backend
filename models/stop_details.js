const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
    stop_name: {
        type: String
    },
    stop_address: {
        type: String
    },
    stop_coordinates: {
        type: String
    }
});

stopSchema.pre("save", function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

module.exports = mongoose.model("StopDetail", stopSchema);