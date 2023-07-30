const mongoose = require("mongoose");

const nfcCardRequestsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    is_validated: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "Pending"
    },
    is_student: {
        type: Boolean,
    }
});

nfcCardRequestsSchema.pre("save", function(next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

module.exports = mongoose.model("nfcCardRequests", nfcCardRequestsSchema);