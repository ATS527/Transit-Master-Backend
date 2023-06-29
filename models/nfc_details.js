const mongoose = require("mongoose");

const nfcSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    card_id: {
        type: String,
    },
    balance: {
        type: Number,
    },
    is_valid: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

nfcSchema.pre("save", function(next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

module.exports = mongoose.model("NFCUsers", nfcSchema);